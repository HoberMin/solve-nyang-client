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
export const getProblem = async () => {
  const result = await api.get<Problem>('/check/problem');

  return result.data;
};

export const getdPoints = async () => {
  const result = await api.post<Points>('/check/point');

  return result.data;
};

export const useGetProblem = () => {
  useSuspenseQuery<Problem>({
    queryKey: ['getProblem'],
    queryFn: getProblem,
  });
};

export const useGetPoints = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: getdPoints,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPoints'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
