import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface Problem {
  problemId: string;
}

interface Points {
  points: number; // string인가..
}
export const getProblem = async (): Promise<Problem> => {
  const result = await api.get<Problem>('/problems/recommendation');

  return result.data as Problem;
};

export const getPoints = async (): Promise<Points> => {
  const result = await api.post<Points>('/attendance/check');

  return result.data as Points;
};

export const useGetProblem = () => {
  return useSuspenseQuery<Problem>({
    queryKey: ['getProblem'],
    queryFn: getProblem,
  });
};

export const useGetPoints = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: getPoints,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPoints'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
