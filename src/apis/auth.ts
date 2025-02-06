import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { domain } from './avatar';

interface ApiResponse {
  accessToken?: string;
  username?: string;
  message?: string;
}

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
    const accessToken = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiResponse>) => {
    if (!error.config) {
      return Promise.reject(error);
    }
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === '토큰이 만료되었습니다.' &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true; // 무한루프 방지
      try {
        const reissueResponse = await axiosInstance.post('/jwt/reissue');
        const newAccessToken = reissueResponse.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (error) {
        const reissueError = error as AxiosError<ApiResponse>;
        if (reissueError.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);
