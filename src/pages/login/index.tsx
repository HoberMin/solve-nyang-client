import { useState } from 'react';

import { KeyRound, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AuthRequest, useSignIn } from '@/apis/sign';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [authForm, setAuthForm] = useState<AuthRequest>({
    username: '',
    password: '',
  });

  const signIn = useSignIn();

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
      <div className='flex min-h-[calc(100vh-64px)] items-center justify-center px-6'>
        <Card className='w-full max-w-md border-zinc-800 bg-zinc-950/50 shadow-lg'>
          <CardHeader className='space-y-4 p-8'>
            <CardTitle className='text-2xl font-semibold text-zinc-100'>
              솔브냥과 함께하기
            </CardTitle>
            <CardDescription className='text-base text-sm text-zinc-400'>
              solved.ac 계정으로 로그인하여 <br />
              귀여운 고양이들을 만나보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className='p-8 pt-0'>
            <form onSubmit={submitForm} className='space-y-6'>
              <div className='space-y-3'>
                <Label htmlFor='username' className='text-base text-zinc-100'>
                  solved.ac 닉네임
                </Label>
                <div className='relative'>
                  <Input
                    id='username'
                    type='text'
                    name='username'
                    value={authForm.username}
                    onChange={handleInputChange}
                    className='h-12 border-zinc-800 bg-zinc-900 pl-12 text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500'
                    placeholder='닉네임을 입력하세요'
                  />
                  <User className='absolute left-4 top-4 h-4 w-4 text-zinc-500' />
                </div>
              </div>

              <div className='space-y-3'>
                <Label htmlFor='password' className='text-base text-zinc-100'>
                  비밀번호
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    value={authForm.password}
                    onChange={handleInputChange}
                    className='h-12 border-zinc-800 bg-zinc-900 pl-12 text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500'
                    placeholder='비밀번호를 입력하세요'
                  />
                  <KeyRound className='absolute left-4 top-4 h-4 w-4 text-zinc-500' />
                </div>
              </div>

              <Button
                type='submit'
                className='h-12 w-full bg-blue-600 text-base text-zinc-100 hover:bg-blue-700'
              >
                로그인하기
              </Button>
            </form>

            <div className='mt-8 text-center'>
              <div className='space-x-1 text-base text-zinc-400'>
                <div className='space-x-8'>
                  <Link
                    to='/find'
                    className='font-medium text-blue-500 transition-colors hover:text-blue-400'
                  >
                    비밀번호 찾기
                  </Link>
                  <span className='text-gray-500'>|</span>

                  <Link
                    to='/signup'
                    className='font-medium text-blue-500 transition-colors hover:text-blue-400'
                  >
                    회원가입
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
