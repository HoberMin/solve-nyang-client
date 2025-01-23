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
  (await axiosInstance.post(
    '/account/signin',
    authForm,
  )) as AxiosResponse<SignInResponse>;

export const signUp = async (authForm: AuthRequest) =>
  (await axiosInstance.post(
    '/account/signup',
    authForm,
  )) as AxiosResponse<SignUpResponse>;

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
    onError: () => {
      toast.error('회원가입에 실패했습니다. solved.ac 인증을 확인하세요.');
    },
  });

  return mutate;
};
