import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { domain } from './avatar';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

interface FindPassword {
  username: string;
}

// 비밀번호 변경
export const useChangePassword = () =>
  useMutation({
    mutationFn: async (changePassword: ChangePassword) => {
      const response = await fetch(`${domain}/password/change`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changePassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 변경 중 오류 발생');
      }
      return (await response.json()) as ChangePassword;
    },
    onSuccess: () => {
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`비밀번호 변경 실패 : ${error.message}`);
    },
  });

// 비밀번호 찾기
export const useFindPassword = async () =>
  useMutation({
    mutationFn: async (username: FindPassword) => {
      const response = await fetch(`${domain}/password/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 찾기 중 오류 발생');
      }

      return (await response.json()) as FindPassword;
    },
    onSuccess: () => {
      toast.success('비밀번호 찾기 요청이 성공적으로 처리되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`비밀번호 찾기 실패 : ${error.message}`);
    },
  });
