import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from './auth';

interface Encryption {
  verificationCode: string;
}

export const getEncryption = async (username: string) => {
  const response = await axiosInstance.post('/account/verify', { username });

  return response.data as Encryption;
};

export const useGetEncryption = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (username: string) => getEncryption(username),
  });

  return mutateAsync;
};
