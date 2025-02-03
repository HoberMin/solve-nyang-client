import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from './auth';

// import { domain } from './avatar';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

interface FindPasswordRequest {
  username: string;
  password: string;
}

interface FindPasswordResponse {
  message: string;
}
// 비밀번호 변경
export const useChangePassword = () =>
  useMutation({
    mutationFn: async ({ currentPassword, newPassword }: ChangePassword) => {
      try {
        const response = await axiosInstance.post('/account/password/change', {
          currentPassword,
          newPassword,
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message || '비밀번호 변경 중 오류 발생',
          );
        }
        throw error;
      }
    },
  });

// 비밀번호 찾기(재설정/재가입)
export const useFindPassword = () =>
  useMutation<FindPasswordResponse, Error, FindPasswordRequest>({
    mutationFn: async ({ username, password }: FindPasswordRequest) => {
      try {
        const response = await axiosInstance.post('/account/password/find', {
          username,
          password,
        });

        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message || '비밀번호 재설정 중 오류 발생',
          );
        }
        throw error;
      }
    },
  });
