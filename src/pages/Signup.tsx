import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// import { signUp } from '@/apis/sign';
import Layout from '@/components/Layout';

import AuthModal from '../components/AuthModal';

interface FormData {
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const Signup = () => {
  // 폼 데이터를 관리하는 상태
  const navigate = useNavigate(); // 페이지 이동
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({}); // 각 입력 필드의 에러 메시지를 관리하는 상태(닉네임, 비밀번호, 비밀번호 확인 에러메시지를 하나의 객체로)
  const [isShowPassword, setIsShowPassword] = useState(false); // 비밀번호 보이기/숨기기
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // 모달 열림 상태
  const [isValid, setIsValid] = useState(false); // 인증 버튼 활성화 상태
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 입력 필드의 name, value 가져오기
    setFormData(prev => ({ ...prev, [name]: value })); // 입력 필드의 name에 해당하는 값을 value로 설정
  };

  // 유효성 검사 함수
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
  const handleVerification = () => {
    if (isValid) {
      setIsAuthModalOpen(true);
    }
  };

  // 인증 성공 시
  const VerificationSuccess = () => {
    setIsAuthModalOpen(false); // 모달 닫기
    setIsVerified(true); // 인증 완료 상태
    alert('인증이 완료되었습니다.');
    // 사용자 정보 저장
    localStorage.setItem(
      'user',
      JSON.stringify({ nickname: formData.nickname }),
    ),
      navigate('/'); // 메인페이지로 이동
  };

  // 모달 닫을 때 인증 상태 초기화
  const closeModal = () => {
    setIsAuthModalOpen(false);
    setIsVerified(false);
  };

  // 회원가입 완료 시 데이터 저장 요청
  // const saveData = async () => {
  //   try {
  //     await signUp();
  //   } catch (err) {
  //     setErrors('회원가입 실패');
  //   }
  // };

  return (
    <Layout>
      <div>
        <h3>Sign up</h3>
        {/* <form onSubmit={onSubmit}> */}
        <div>
          {/* 닉네임 */}
          <label>solved.ac 닉네임</label>
          <input
            type='text'
            name='nickname'
            placeholder='닉네임 입력'
            className='w-full rounded-md border px-4 py-2'
            value={formData.nickname}
            onChange={inputChange}
          />
          {errors.nickname && (
            <p className='text-sm text-white'>{errors.nickname}</p>
          )}
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type={isShowPassword ? 'text' : 'password'}
            name='password'
            placeholder='영문, 숫자, 특수문자를 포함하여 입력해주세요(8자 이상)'
            className='w-full rounded-md border px-4 py-2'
            value={formData.password}
            onChange={inputChange}
          />
          <button
            type='button'
            className='rounded-md bg-blue-500 px-4 py-2 text-white'
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? '숨기기' : '보이기'}
          </button>
          {errors.password && (
            <p className='text-sm text-white'>{errors.password}</p>
          )}
        </div>

        <div>
          <label className='mb-1 block'>비밀번호 확인</label>
          <div className='flex items-center gap-2'>
            <input
              type='password'
              name='passwordConfirm'
              placeholder='비밀번호 확인'
              className='flex-1 rounded-md border px-4 py-2'
              value={formData.passwordConfirm}
              onChange={inputChange}
            />
            {isVerified ? (
              <button
                type='button'
                disabled
                className='cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-white'
              >
                인증완료
              </button>
            ) : (
              <button
                type='button'
                disabled={!isValid} // 유효하지 않으면 비활성화
                onClick={handleVerification}
                className='rounded-md bg-blue-500 px-4 py-2 text-white'
              >
                인증하기
              </button>
            )}
          </div>
          {errors.passwordConfirm && (
            <p className='text-sm text-white'>{errors.passwordConfirm}</p>
          )}
        </div>

        {/* 회원가입 완료 버튼 클릭 후 자동로그인 및 메인페이지로 이동 */}
        <div className='mt-4'>
          <button
            type='submit'
            className='w-full rounded-md bg-green-500 py-2 text-white'
          >
            회원가입 완료
          </button>
        </div>

        {/* 모달 띄우기 */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeModal}
          onVerify={VerificationSuccess}
        />
      </div>
    </Layout>
  );
};
export default Signup;
