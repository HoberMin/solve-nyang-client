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
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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

    // 엑세스 토큰 만료된 경우 401 "유효하지 않은 토큰입니다."
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === '유효하지 않은 토큰입니다.' &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true; // 무한루프 방지
      try {
        // 리프래시 토큰으로 액세스 토큰 재발급 요청
        const reissueResponse = await axiosInstance.post('/jwt/reissue');
        const newAccessToken = reissueResponse.data.accessToken;

        // 새로운 액세스 토큰이 있다면 로컬스토리지에 저장
        if (newAccessToken) {
          localStorage.setItem('token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest); // 원래 요청 재시도
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
