import { useMutation } from '@tanstack/react-query';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { axiosInstance } from './auth';

export interface AuthRequest {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

interface SignInResponse {
  accessToken: string;
}

interface SignUpResponse {
  message: string;
}

interface AxiosResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export const signIn = async (authForm: AuthRequest) =>
  (await axiosInstance.post(
    '/account/signin',
    authForm,
  )) as AxiosResponse<SignInResponse>;

export const signUp = async (authForm: AuthRequest) =>
  (await axiosInstance.post(
    '/account/signup',
    authForm,
  )) as AxiosResponse<SignUpResponse>;

export const signOut = async () => {
  const response = await axiosInstance.get('/account/signout');

  return response.data;
};

export const useSignOut = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      localStorage.removeItem('token');
      // queryClient.clear();
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    },
    onError: () => {
      localStorage.removeItem('token');
      // queryClient.clear();
      navigate('/');
    },
  });
};

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (authForm: AuthRequest) => signIn(authForm),
    onSuccess: response => {
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      toast.success('로그인에 성공했습니다.');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error(error);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (formData: AuthRequest) => signUp(formData),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(`회원가입에 실패했습니다. ${error.response?.data.message}`);
    },
  });

  return mutate;
};
