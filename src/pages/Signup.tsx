import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getEncryption, postEncryption } from '@/apis/encryption';
import { signUp } from '@/apis/sign';
import Layout from '@/components/Layout';

// import AuthModal from '../components/AuthModal';

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
  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // 모달 열림 상태
  // const [isValid, setIsValid] = useState(false); // 인증 버튼 활성화 상태
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 회원가입 페이지 접속 시 백엔드에서 암호화키 요청
  useEffect(() => {
    fetchEncryptionKey(); //
  }, []);

  // 암호화 키 요청 함수
  // 암호화 키 임시 설정
  const fetchEncryptionKey = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      // const reponse = 'TEMP-ENCRYPTION-KEY'; // 확인용 임시값
      const response = await getEncryption(); // API 호출
      setEncryptionKey(response.encryption); // 암호화키 저장
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        encryptionKey: '암호화 키를 불러오지 못했습니다.',
      }));
    }
    setIsLoading(false); // 로딩 종료
  };

  // 입력값 변경 핸들러
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 입력 필드의 name, value 가져오기
    setFormData(prev => ({ ...prev, [name]: value })); // 입력 필드의 name에 해당하는 값을 value로 설정
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

  // 인증 버튼 클릭 시 모달 열기
  // const handleVerification = () => {
  //   if (isValid) {
  //     setIsAuthModalOpen(true);
  //   }
  // };

  // solved.ac 인증 처리
  // const handleVerification = async () => {
  //   // setIsAuthModalOpen(false); // 모달 닫기
  //   if (!isValid) return;
  //   setIsLoading(true);
  //   try {
  //     await postEncryption(formData.nickname);
  //     setIsVerified(true); // 인증 완료 상태
  //     alert('인증이 완료되었습니다.');
  //   } catch (err) {
  //     setErrors(prev => ({
  //       ...prev,
  //       nickname: '닉네임 인증에 실패했습니다.',
  //     }));
  //   }
  //   // // 사용자 정보 저장
  //   // localStorage.setItem(
  //   //   'user',
  //   //   JSON.stringify({ nickname: formData.nickname }),
  //   // ),
  //   setIsLoading(false);
  // };

  // 모달 닫을 때 인증 상태 초기화
  // const closeModal = () => {
  //   // setIsAuthModalOpen(false);
  //   setIsVerified(false);
  // };

  // 회원가입 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || !isVerified || isSubmitting) return;

    // 제출 중 상태
    setIsSubmitting(true);
    try {
      await signUp({
        nickname: formData.nickname,
        password: formData.password,
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/login'); // 로그인 페이지로 이동
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
      <form onSubmit={handleSubmit} className='justify-items-center py-20'>
        <h2 className='text-white'>Sign up</h2>

        {/* 암호화 키 */}
        <div>
          <label>암호화 키</label>
          <input
            id='encryption-key'
            type={isKeyVisible ? 'text' : 'password'}
            value={isLoading ? '암호화 키를 불러오는 중...' : encryptionKey}
            className='col-span-3'
          />
          <button
            type='button'
            onClick={() => setIsKeyVisible(!isKeyVisible)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600'
          >
            {isKeyVisible ? '👁️' : '🫣'}
          </button>
          {errors.encryption && (
            <p className='text-red-500'>{errors.encryption}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div className='flex flex-col py-4'>
          <label className='text-white'>solved.ac 닉네임</label>
          <input
            type='text'
            name='nickname'
            placeholder='닉네임 입력'
            className='w-[500px] rounded-md border px-4 py-2'
            value={formData.nickname}
            onChange={inputChange}
            disabled={isVerified}
          />

          <button
            type='button'
            className='cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-white'
            disabled={!isValid}
            >
            {isVerified ? (
            }
          </button>
        {errors.nickname && (
          <p className='text-sm text-white'>{errors.nickname}</p>
        )}
        </div>

        <div className='py-4'>
          <label className='text-white'>비밀번호</label>
          <div className='flex items-center gap-2'>
            <input
              type={isShowPassword ? 'text' : 'password'}
              name='password'
              placeholder='영문, 숫자, 특수문자를 포함하여 입력해주세요(8자 이상)'
              className='w-[400px] rounded-md border px-4 py-2'
              value={formData.password}
              onChange={inputChange}
            />
            <button
              type='button'
              className='w-[100px] rounded-md bg-blue-500 px-4 py-2 text-white'
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? '숨기기' : '보이기'}
            </button>
          </div>
          {errors.password && (
            <p className='text-sm text-white'>{errors.password}</p>
          )}
        </div>

        <div className='py-4'>
          <label className='text-white'>비밀번호 확인</label>
          <div className='flex items-center gap-2'>
            <input
              type='password'
              name='passwordConfirm'
              placeholder='비밀번호 확인'
              className='w-[400px] rounded-md border px-4 py-2'
              value={formData.passwordConfirm}
              onChange={inputChange}
            />
          </div>
          {errors.passwordConfirm && (
            <p className='text-sm text-white'>{errors.passwordConfirm}</p>
          )}
        </div>

        {/* 회원가입 완료 버튼 클릭 후 자동로그인 및 메인페이지로 이동 */}
        <div>
          <button
            type='submit'
            className='rounded-md bg-green-500 py-2 text-white'
          >
            회원가입 완료
          </button>
        </div>

        {/* 모달 띄우기 */}
        {/* <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeModal}
          onVerify={VerificationSuccess}
        /> */}
      </form>
    </Layout>
  );
};
export default Signup;
