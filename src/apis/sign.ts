import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// axios의 에러 타입 정의
// import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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

// 서버 에러 응답 타입 정의
interface ErrorResponse {
  message: string;
  statusCode: number;
}

// 로그인 API 호출
export const signIn = async (authForm: AuthRequest) => {
  // 로그인 요청 보내기
  const response = await axiosInstance.post('/account/signin', authForm);
  // 응답 데이터를 SignInResponse 타입으로 변환
  const data = response.data as SignInResponse;

  // 응답 데이터에 엑세스 토큰이 있으면 LocalStorage에 저장
  if (data.accessToken) {
    localStorage.setItem('token', data.accessToken);
  }
  return data;
};

// 회원 가입 API 호출
export const signUp = async (authForm: AuthRequest) => {
  (await axiosInstance.post('/account/signup', authForm)) as SignUpResponse;
};

export const useSignIn = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: (authForm: AuthRequest) => signIn(authForm),

    // 성공시
    onSuccess: () => {
      // localStorage에서 저장된 리다이렉트 경로 가져오기(결과가 null 또는 undefined 값이 없으면 기본값 '/')
      const redirectPath = localStorage.getItem('redirectPath') || '/';

      // 리다이렉트 경로 정보 삭제
      localStorage.removeItem('redirectPath');

      // 저장된 경로로 이동
      navigate(redirectPath);
    },

    // 에러 발생 시
    onError: (error: ErrorResponse) => {
      // 401 에러인 경우 처리
      if (error.statusCode === 401) {
        console.error('로그인 실패', error);
      }
    },
  });

  return mutateAsync;
};

export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (formData: AuthRequest) => signUp(formData),
    // 성공시
    onSuccess: () => {
      navigate('/login'); // 로그인 페이지로 이동
      //
    },
    // 에러 발생 시
    onError: (error: ErrorResponse) => {
      // 401 에러인 경우
      if (error.statusCode === 401) {
        console.error('회원가입 실패:', error);
      }
    },
  });

  return mutateAsync;
};
