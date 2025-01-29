import { useMutation } from '@tanstack/react-query';

import { domain } from './avatar';

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
// 비밀번호 변경
export const useChangePassword = () =>
  useMutation({
    mutationFn: async ({ currentPassword, newPassword }: ChangePassword) => {
      const response = await fetch(`${domain}/account/password/change`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 변경 중 오류 발생');
      }
      return (await response.json()) as ChangePassword;
    },
  });

// 비밀번호 찾기(재설정/재가입)
export const useFindPassword = () =>
  useMutation<FindPasswordResponse, Error, FindPasswordRequest>({
    mutationFn: async ({ username, password }: FindPassword) => {
      const response = await fetch(`${domain}/account/password/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 재설정 중 오류 발생');
      }

      return response.json();
    },
  });
