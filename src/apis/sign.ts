import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { domain } from './avatar';

export interface AuthRequest {
  username: string;
  password: string;
}

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터: 모든 응담/요청을 가로채서 처리
// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.setItem('redirectPath', window.location.pathname);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('token');
    // 토큰이 있으면 요청 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

interface SignInResponse {
  accessToken: string;
}

interface SignUpResponse {
  message: string;
}

interface AxiosResponse<T> {
  data: T;
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

  return mutate;
};
