import { useState } from 'react';

import { Button, Container, Input } from 'nes-ui-react';

import { AuthRequest, useSignIn } from '@/apis/sign';
import Layout from '@/components/Layout';

const Login = () => {
  const [authForm, setAuthForm] = useState<AuthRequest>({
    nickname: '',
    password: '',
  });
  const signIn = useSignIn();

  const handleInputChange = (value: string, fieldName: string) => {
    setAuthForm(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { accessToken } = await signIn(authForm);
    localStorage.setItem('token', accessToken);
  };

  return (
    <Layout>
      <div className='flex h-[calc(100vh-64px)] items-center justify-center'>
        <Container
          roundedCorners
          className='w-[450px] bg-black bg-opacity-70 p-6'
        >
          <h3 className='mb-6 flex justify-center text-2xl text-white'>
            Login
          </h3>
          <form className='flex flex-col items-center' onSubmit={submitForm}>
            <div className='mb-4 flex w-full flex-col'>
              <label className='mb-0 text-xl text-white'>
                solved.ac 닉네임
              </label>
              <Input
                type='text'
                name='nickname'
                value={authForm.nickname}
                onChange={value => handleInputChange(value, 'nickname')}
                className='w-full'
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>

            <div className='mb-6 flex w-full flex-col'>
              <label className='mb-0 text-xl text-white'>비밀번호</label>
              <Input
                type='password'
                name='password'
                value={authForm.password}
                onChange={value => handleInputChange(value, 'password')}
                className='w-full'
                style={{ backgroundColor: 'white', color: 'black' }}
              />
            </div>

            <Button type='submit' color='success' style={{ color: '#000' }}>
              로그인
            </Button>
          </form>

          <div className='mt-6 flex justify-center gap-2'>
            <p className='text-white'>계정이 없으신가요?</p>
            <a href='/signup' className='text-blue-400 hover:text-blue-300'>
              회원가입
            </a>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
