import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { api } from './core';

export interface AuthRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

interface SignUpResponse {
  message: string;
}

export const signIn = async (authForm: AuthRequest) => {
  const result = await api.post<SignInResponse>('/account/signin', authForm);

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '로그인에 실패했습니다.');
  }

  return result.data;
};

export const signUp = async (authForm: AuthRequest) => {
  const result = await api.post<SignUpResponse>('/account/signup', authForm);

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '회원가입에 실패했습니다.');
  }

  return result.data;
};

export const signOut = async (): Promise<void> => {
  const result = await api.get('/account/signout');

  if (!result.isSuccess) {
    throw new Error(result.message || '로그아웃에 실패했습니다.');
  }
};

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || '로그아웃에 실패했습니다.');
    },
  });

  return mutate;
};

export const useSignIn = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: data => {
      localStorage.setItem('token', data.accessToken);
      toast.success('로그인에 성공했습니다.');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || '아이디와 비밀번호를 확인해주세요.');
    },
  });

  return mutate;
};

export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || '회원가입에 실패했습니다.');
    },
  });

  return mutate;
};
