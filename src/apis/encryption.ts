import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from './auth';

// import { domain } from './avatar';

interface Encryption {
  verificationCode: string;
}

export const getEncryption = async (username: string): Promise<Encryption> => {
  try {
    const response = await axiosInstance.post('/account/verify', { username });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
};

export const useGetEncryption = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (username: string) => getEncryption(username),
  });

  return mutateAsync;
};
