import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { domain } from './avatar';

interface ApiResponse {
  accessToken?: string;
  username?: string;
}

// 메모리에 저장
let accessToken: string | null = null;

// 타입 에러 해결을 위한 AxiosConfig 타입 확장
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000,
  withCredentials: true, // HTTP-Only 쿠키(refresh)
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  // Silent Refresh: 401 없이 access 토큰 자동 반환
  (response: AxiosResponse<ApiResponse>) => {
    // 응답에 새로운 액세스 토큰이 있는 경우 저장

    const newToken = response.headers['new-access-token']; // 헤더로
    if (newToken) {
      setAccessToken(newToken);

      // 원본 요청
      // const originalRequest = response.config;

      // if (originalRequest.headers) {
      //   originalRequest.headers.Authorization = `Bearer ${newToken}`;
      // }
      // return axiosInstance(originalRequest);
    }
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    // 리프레시 토큰이 만료된 경우에만 로그인 페이지로 이동
    if (error.response?.status === 401) {
      clearAccessToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },

  // const originalRequest = error.config;
  // if (
  //   error.response?.status === 401 &&
  //   originalRequest &&
  //   !originalRequest._retry
  // ) {
  //   originalRequest._retry = true;

  //   try {
  //     // 리프레시 토큰으로 새로운 액세스 토큰 요청
  //     const response = await axiosInstance.get('/user/me');
  //     if (response.data?.accessToken) {
  //       setAccessToken(response.data.accessToken);

  //       return axiosInstance(originalRequest);
  //     }
  //   } catch {
  //     clearAccessToken();
  //     window.location.href = '/login';
  //   }
  // }
  // return Promise.reject(error);
);

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// 인증 상태 확인 함수
const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/user/me');

    // 새로고침 후 첫 요청시 새 액세스 토큰 받아옴?
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken);
    }
    return response.data;
  } catch {
    // 401 에러일 때 고려해야하나?
    return null;
  }
};

// 인증 상태 관리 커스텀 훅
export const useAuthQuery = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    retry: false,
  });
};

// 라우트 보호를 위한 컴포넌트?
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: auth, isLoading } = useAuthQuery();

  const publicPages = ['/login', '/signup', '/password/find'];
  const isPublicPage = publicPages.includes(location.pathname);

  useEffect(() => {
    if (isLoading) return;
    // 비인증 상태로 보호된 페이지 접근 시도
    if (!auth?.username && !isPublicPage) {
      toast.error('로그인이 필요한 서비스입니다.', {
        description: '로그인 페이지로 이동합니다.',
        action: {
          label: '확인',
          onClick: () => navigate('/login'),
        },
      });
      navigate('/login');
    } else if (auth?.username && isPublicPage) {
      navigate('/');
    }
  }, [auth, isLoading, isPublicPage, navigate]);

  if (isLoading) return null; // 또는 로딩 컴포넌트?

  return children;
};
