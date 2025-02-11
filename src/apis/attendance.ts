import {
  useMutation,
  useQueryClient,
  // useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface Records {
  date: string;
  attended: boolean;
}

export const getReward = async () => {
  const result = await api.post('/attendance/reward');

  return result.data;
};

export const getRecords = async () => {
  const result = await api.get('/attendance/records');

  return result.data as Records;
};

// export const getMessage = async () => {
//   const result = await api.get('');

//   return result.data;
// };

export const useGetReward = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: getReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReward'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
