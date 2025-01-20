import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { domain } from './avatar';

export interface AuthRequest {
  nickname: string;
  password: string;
}

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Contenet-Type': 'application/json',
  },
});

interface SignInResponse {
  accessToken: string;
}

interface SignUpResponse {
  message: string;
}

export const signIn = async (authForm: AuthRequest) =>
  (await axiosInstance.post('/account/signin', authForm)) as SignInResponse;

export const signUp = async (authForm: AuthRequest) =>
  (await axiosInstance.post('/account/signup', authForm)) as SignUpResponse;

export const useSignIn = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (authForm: AuthRequest) => signIn(authForm),
  });

  return mutateAsync;
};

export const useSignUp = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (formData: AuthRequest) => signIn(formData),
  });

  return mutateAsync;
};
