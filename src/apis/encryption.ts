import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FEEDBACK_MESSAGES } from '@/pages/signup/constants';

import { api } from './core';

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
      toast.success(FEEDBACK_MESSAGES.ENCRYPTION_GUIDE);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutateAsync;
};
