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
  response => response,
  async (error: AxiosError) => {
    // 엑세스 토큰 만료된 경우 401 "유효하지 않은 토큰입니다."
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      
    }

    // 리프레시 토큰이 만료된 경우 로그인 페이지로 이동
    if (error.response?.status === 401) {
      clearAccessToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },

  if (
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      // 리프레시 토큰으로 새로운 액세스 토큰 요청
      const response = await axiosInstance.get('/user/me');
      if (response.data?.accessToken) {
        setAccessToken(response.data.accessToken);

        return axiosInstance(originalRequest);
      }
    } catch {
      clearAccessToken();
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
);
