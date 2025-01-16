import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { signIn } from '@/apis/sign';
import Layout from '@/components/Layout';

interface FormData {
  nickname: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    password: '',
  });
  const [error, setError] = useState<string>(''); // 에러 메시지 상태
  const navigate = useNavigate();

  // input 값 변경되면 호출되는 이벤트 핸들러
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, // 기존 상태 복사(사용자가 비밀번호를 입력 중이라면 nickname 값은 그대로 유지하면서 password 값만 업데이트해야 함)
      [e.target.name]: e.target.value,
      // e.target.name: 이벤트가 발생한 요소의 name 속성 값(어떤 필드가 변경되었는지 구분)
      // e.target.value: 입력 필드에 사용자가 입력한 값
    });
  };

  // 로그인 폼 제출 함수
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn(formData); // 로그인 요청 API 호출
      if (response.ok) {
        navigate('/'); // 메인 페이지로 이동
      } else {
        const errorData = await response.json();
        setError(errorData.message || '로그인 실패');
      }
    } catch (error) {
      setError('서버 문제');
    }
  };

  return (
    <Layout>
      <div>
        <h3>Login</h3>
        <form onSubmit={submitForm}>
          <label className='text-white'>solved.ac 닉네임</label>
          <input
            type='text'
            name='nickname'
            value={formData.nickname}
            onChange={changeForm}
            className='w-[300px] rounded border px-3 py-2'
          />
          {error && <p className='mb-4 text-red-500'>{error}</p>}

          <label className='text-white'>비밀번호</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={changeForm}
            required // 이 조건 꼭 필요할까
            placeholder='비밀번호를 입력하세요'
            className='w-[300px] rounded border px-3 py-2'
          />
          <button className='rounded bg-blue-500 py-2 text-white transition hover:bg-blue-700'>
            로그인
          </button>
        </form>

        <div>
          <p className='text-white'>계정이 없으신가요?</p>
          <a href='/signup'>회원가입</a>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
