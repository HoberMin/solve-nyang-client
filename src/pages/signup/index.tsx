import { useEffect, useState } from 'react';

import { Button, Container, Input } from 'nes-ui-react';
import { useNavigate } from 'react-router-dom';

import { getEncryption, postEncryption } from '@/apis/encryption';
import { signUp } from '@/apis/sign';
import Layout from '@/components/Layout';

// import { SourceCodeButton } from '../SourceCodeButton';
import EyeOffIcon from '/eye-off.svg';
import EyeIcon from '/eye.svg';

///////////////////////////////////////////////////////////////////////////////////

interface FormData {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const Signup = () => {
  const navigate = useNavigate(); // 페이지 이동

  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); // 각 입력 필드의 에러 메시지를 관리하는 상태(닉네임, 비밀번호, 비밀번호 확인 에러메시지를 하나의 객체로)
  const [encryptionKey, setEncryptionKey] = useState(''); // 암호화 키 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [isKeyVisible, setIsKeyVisible] = useState(false); // 암호화 키 보이기/숨기기
  const [isKeyIssued, setIsKeyIssued] = useState(false); // 암호화 키 발행
  const [isValid, setIsValid] = useState(false); // 인증 버튼 활성화 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 암호화 키 발급 요청 함수
  const handleKeyIssuance = async () => {
    if (!formData.nickname.trim()) {
      setErrors(prev => ({ ...prev, nickname: '닉네임을 입력해주세요' }));
      return;
    }
    setIsLoading(true); // 로딩
    try {
      // 임시 데이터
      const mockEncryptionKey = 'TEMP-' + Math.random().toString().substr(2, 9);
      setEncryptionKey(mockEncryptionKey);

      const response = await getEncryption();
      setEncryptionKey(response.encryption);
      setIsKeyIssued(true);

      // solved.ac 인증 요청
      await postEncryption(formData.nickname);
      // alert 말고 p 태그로 암호화 키 발급 폼 밑에 초록 글씨로 띄울까
      // 발급 완료/실패에 대한 알림 로직이 필요할까?
      // 암호화키 발급 중 -> 발급 완료 문구 띄우기?

      // 실제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('암호화 키가 발급되었습니다. solved.ac에서 인증을 진행해주세요.');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        encryption: '암호화 키 발급에 실패했습니다.',
      }));
      setIsKeyIssued(false);
    }
    setIsLoading(false);
  };

  // solved.ac 인증 확인
  const checkUser = async () => {
    if (!isKeyIssued) {
      alert('먼저 암호화 키를 발급받아주세요.');
      return;
    }
    setIsLoading(true);
    try {
      // 실제 API 호출 대신 타임아웃으로 딜레이 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      // await postEncryption(formData.nickname);
      alert('인증이 완료되었습니다.');
      setIsValid(true);
    } catch (err) {
      alert('본인 인증에 실패했습니다. solved.ac에서 인증을 진행해주세요.');
      setIsValid(false);
    }
    setIsLoading(false);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    // 닉네임 필드 검증
    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해 주세요.';
    }
    // 비밀번호 필드 검증
    if (!formData.password) {
      // 비어있을 경우
      newErrors.password = '비밀번호를 입력해 주세요.';
    } else if (formData.password.length < 8) {
      // 8자 이하일 경우
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        formData.password,
      )
    ) {
      // 문자열이 특정 패턴(정규식)을 만족하는지 true 또는 false로 반환, ^(Caret)은 문자열의 시작을 의미.
      newErrors.password =
        '비밀번호는 영문, 숫자, 특수문자를 최소 1자 포함해야 합니다.';
    }

    // 비밀번호 확인 필드 검증
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors); // 에러 메시지 상태 업데이트
    return Object.keys(newErrors).length === 0; // 에러 메시지가 하나도 없으면 true 반환
  };

  // 입력값 변경 시 실시간 유효성 검사
  useEffect(() => {
    const isValidPassword = validatePassword();
    setIsValid(isValidPassword);
  }, [formData]);

  // 회원가입 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || !isSubmitting || !validatePassword()) return;

    // 제출 중 상태
    setIsSubmitting(true);
    try {
      await signUp({
        nickname: formData.nickname,
        password: formData.password,
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: '회원가입에 실패했습니다.',
      }));
    }
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className='flex min-h-screen items-center justify-center'>
        {/* 왼쪽: 인증 방법 설명 */}
        <div className='mx-10'>
          <div className='mt-4 flex w-[500px] flex-col items-center'>
            <h2 className='text-white'>본인 인증 방법</h2>
            {/* 인증 방법 설명 캡쳐 이미지 */}
            <img
              className='mt-4 h-[200px] w-[400px]'
              src='/signup_description1.jpg'
              alt='인증 방법 설명'
            />
            {/* 문구 설명 */}
            <p>1. solved.ac 로그인 후 프로필 설정 클릭</p>
            <img
              className='mt-4 h-[120px] w-[400px]'
              src='/signup_description2.jpg'
              alt='인증 방법 설명'
            />
            <p>2. '이름' 항목의 모국어, 영어로 작성 칸 모두 암호화키 입력</p>
            <p>3. 프로필 표시 ON</p>
          </div>
          <div className='mt-4 flex justify-center'>
            <a href='https://solved.ac/'>
              <Button>solved.ac 바로가기</Button>
            </a>
          </div>
        </div>

        {/* 오른쪽: 회원가입 폼 */}
        <Container
          roundedCorners
          className='py-6 opacity-55'
          style={{
            width: '450px',
            height: '500px',
            backgroundColor: '#1a1a1a',
            // margin: '0 auto',
            // padding: '16px',
            // borderRadius: '10px',
          }}
        >
          <form onSubmit={handleSubmit} className='justify-items-center py-8'>
            <h2 className='text-56xl text-white'>Sign up</h2>

            {/* 닉네임 */}
            <div className='flex flex-col py-4'>
              <label className='text-white'>solved.ac 닉네임</label>

              <div className='flex items-center gap-2'>
                <Input
                  // color='warning'
                  autoComplete='first-name'
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 0, // 이 부분 없으면 테두리 사이에 틈 생김
                  }}
                  type='text'
                  name='nickname'
                  // placeholder='닉네임 입력'
                  className='w-[265px] border px-8 py-3'
                  value={formData.nickname}
                  onChange={handleInputChange}
                  disabled={isKeyIssued} // true일 경우 disabled
                />
                <Button
                  type='button'
                  onClick={handleKeyIssuance}
                  disabled={isKeyIssued || isLoading}
                  color={isKeyIssued ? 'disabled' : 'primary'} // className 대신 color prop 사용
                  style={{ color: '#000' }} // 검정색 글씨
                >
                  암호화 키 발급
                </Button>
              </div>
              {errors.nickname && (
                <p className='text-sm text-white'>{errors.nickname}</p>
              )}
            </div>

            {/* 암호화 키 */}
            <div className='flex flex-col'>
              <label className='text-white'>암호화 키</label>
              <div className='relative'>
                <Input
                  id='encryption-key'
                  type={isKeyVisible ? 'text' : 'password'}
                  value={
                    isLoading ? '암호화 키를 불러오는 중...' : encryptionKey
                  }
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 0, // 이 부분 없으면 테두리 사이에 틈 생김
                  }}
                  className='w-[350px] rounded-md border px-8 py-3'
                  // readOnly
                />
                {/* 버튼에 넣지 않고 이미지 클릭으로 해도 되겠네  */}
                <button
                  type='button'
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                  className='absolute right-0 top-1/2 -translate-y-1/2 bg-transparent'
                >
                  <img
                    src={isKeyVisible ? EyeOffIcon : EyeIcon}
                    alt=''
                    className='h-5 w-5'
                  />
                </button>
              </div>

              {/* 암호화 키 에러정보 */}
              {errors.encryption && (
                <p className='text-red-500'>{errors.encryption}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className=''>
              <label className='text-white'>비밀번호</label>
              <div className='relative'>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  // placeholder='영문, 숫자, 특수문자를 포함하여 입력해주세요(8자 이상)'
                  className='w-[350px] rounded-md border px-8 py-3'
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 0, // 이 부분 없으면 테두리 사이에 틈 생김
                  }}
                />
                <button
                  type='button'
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className='absolute right-0 top-1/2 -translate-y-1/2 bg-transparent'
                >
                  <img
                    src={isShowPassword ? EyeOffIcon : EyeIcon}
                    alt=''
                    className='h-5 w-5'
                  />
                </button>
              </div>
              {/* 비밀번호 정규식 조건 확인 */}
              {errors.password && (
                <p className='text-sm text-white'>{errors.password}</p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className=''>
              <label className='text-white'>비밀번호 확인</label>
              <div className='flex items-center gap-2'>
                <Input
                  type='password'
                  name='passwordConfirm'
                  // placeholder='비밀번호 확인'
                  className='w-[350px] rounded-md border px-8 py-3'
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 0, // 이 부분 없으면 테두리 사이에 틈 생김
                  }}
                />
              </div>
              {errors.passwordConfirm && (
                <p className='text-sm text-white'>{errors.passwordConfirm}</p>
              )}
            </div>

            {/* 회원가입 버튼 클릭 후 로그인 페이지로 이동 */}
            <div>
              <Button
                type='submit'
                color='success'
                onClick={checkUser}
                style={{ color: '#000' }} // 검정색 글씨
              >
                회원가입
              </Button>
              {errors.submit && <p className='text-red-500'>{errors.submit}</p>}
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  );
};
export default Signup;
