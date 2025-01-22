import { useState } from 'react';

import { AuthRequest, useSignIn } from '@/apis/sign';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [authForm, setAuthForm] = useState<AuthRequest>({
    username: '',
    password: '',
  });

  const { mutate: signIn, isPending } = useSignIn();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(authForm);
  };

  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-64px)] items-center justify-center'>
        <Card className='w-96 bg-black/70'>
          <CardHeader>
            <CardTitle className='text-center text-3xl text-white'>
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitForm} className='space-y-6'>
              <div className='space-y-1'>
                <Label className='text-xl text-white'>solved.ac 닉네임</Label>
                <Input
                  type='text'
                  name='username'
                  value={authForm.username}
                  onChange={handleInputChange}
                  className='bg-white text-black'
                  disabled={isPending}
                />
              </div>

              <div className='space-y-1'>
                <Label className='text-xl text-white'>비밀번호</Label>
                <Input
                  type='password'
                  name='password'
                  value={authForm.password}
                  onChange={handleInputChange}
                  className='bg-white text-black'
                  disabled={isPending}
                />
              </div>

              <Button
                type='submit'
                className='w-full p-3 bg-green-500 text-black hover:bg-green-600'
                disabled={isPending}
              >
                {isPending ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            <div className='mt-4 flex justify-center gap-2'>
              <p className='text-base text-white'>계정이 없으신가요?</p>
              <a
                href='/signup'
                className='text-base text-blue-400 hover:text-blue-300'
              >
                회원가입
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
