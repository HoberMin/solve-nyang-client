import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from './auth';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

interface FindPassword {
  username: string;
  password: string;
}

interface FindPasswordRequest {
  username: string;
  password: string;
}

interface FindPasswordResponse {
  message: string;
}

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePassword) => {
  const response = await axiosInstance.post('/account/password/change', {
    currentPassword,
    newPassword,
  });

  return response.data;
};

export const findPassword = async ({ username, password }: FindPassword) => {
  const response = await axiosInstance.post('/account/password/find', {
    username,
    password,
  });

  return response.data;
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: changePassword,
  });

export const useFindPassword = () =>
  useMutation<FindPasswordResponse, Error, FindPasswordRequest>({
    mutationFn: findPassword,
  });
