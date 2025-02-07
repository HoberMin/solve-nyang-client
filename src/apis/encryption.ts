import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

// 타입 정의
interface Encryption {
  verificationCode: string;
}

export const getEncryption = async (username: string) => {
  const result = await api.post<Encryption>('/account/verify', { username });

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '인증 코드 발급에 실패했습니다.');
  }

  return result.data;
};

export const useGetEncryption = () => {
  const { mutateAsync } = useMutation({
    mutationFn: getEncryption,
    onSuccess: () => {
      toast.success('인증 코드가 발급되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutateAsync;
};
