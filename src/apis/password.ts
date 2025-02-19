import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface FindPasswordRequest {
  username: string;
  password: string;
}

interface PasswordResponse {
  message: string;
}

export const changePassword = async (
  changePasswordForm: ChangePasswordRequest,
) => {
  const result = await api.post<PasswordResponse>(
    '/account/password/change',
    changePasswordForm,
  );

  if (!result.isSuccess) {
    throw new Error(result.message || '비밀번호 변경에 실패했습니다.');
  }

  return result.data;
};

export const findPassword = async (findPasswordForm: FindPasswordRequest) => {
  const result = await api.post<PasswordResponse>(
    '/account/password/find',
    findPasswordForm,
  );

  if (!result.isSuccess) {
    throw new Error(result.message || '비밀번호 찾기에 실패했습니다.');
  }

  return result.data;
};

export const useChangePassword = () => {
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useFindPassword = () => {
  const { mutate } = useMutation({
    mutationFn: findPassword,
    onSuccess: () => {
      toast.success('비밀번호가 성공적으로 재설정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
