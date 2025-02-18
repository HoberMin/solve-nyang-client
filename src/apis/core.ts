import { AxiosError } from 'axios';
import axios from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ApiResult<T> {
  data: T | null;
  isSuccess: boolean;
  status: number;
  message?: string;
}

const DOMAIN = 'https://api.solve-nyang.com';
const MAX_RETRY_COUNT = 3;
let currentRetryCount = 0;

const axiosInstance = axios.create({
  baseURL: DOMAIN,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return error;
  },
);

axiosInstance.interceptors.response.use(
  response => {
    currentRetryCount = 0;
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const { response } = error;

    if (
      response?.status === 401 &&
      error.response?.data?.message === '토큰이 만료되었습니다.' &&
      currentRetryCount < MAX_RETRY_COUNT
    ) {
      currentRetryCount++;

      try {
        const { data } = await axiosInstance.post<{ accessToken: string }>(
          '/jwt/reissue',
        );

        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          return axiosInstance(error.config!);
        }
      } catch {
        currentRetryCount = 0;
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    if (currentRetryCount >= MAX_RETRY_COUNT) {
      currentRetryCount = 0;
      localStorage.removeItem('token');
      return Promise.reject(
        new Error('토큰 재발급 최대 재시도 횟수를 초과했습니다.'),
      );
    }

    return Promise.reject(error);
  },
);

const createApiMethod = <T>(method: HttpMethod) => {
  return async <R = T>(url: string, data?: unknown): Promise<ApiResult<R>> => {
    const config = {
      method,
      url,
      ...(method === 'get' ? { params: data } : { data }),
    };

    try {
      const response = await axiosInstance<R>(config);
      const isSuccess = response.status >= 200 && response.status < 300;

      return {
        data: response.data,
        isSuccess,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          data: null,
          isSuccess: false,
          status: error.response?.status || 500,
          message: error.response?.data?.message || error.message,
        };
      }

      return {
        data: null,
        isSuccess: false,
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : '알 수 없는 에러가 발생했습니다.',
      };
    }
  };
};
export const api = {
  get: createApiMethod('get'),
  post: createApiMethod('post'),
  patch: createApiMethod('patch'),
  delete: createApiMethod('delete'),
};
