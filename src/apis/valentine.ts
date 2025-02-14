import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface ValentineCoin {
  coin: number;
}

interface ValentineAvatar {
  avatarName: string;
}
const valentineCoin = async () => {
  const result = await api.get<ValentineCoin>('/promotion/member/coin');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};

const gachaValentineAvatar = async () => {
  const result = await api.post<ValentineAvatar>('/promotion/draw');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '가챠 뽑기에 실패했습니다.');
  }

  return result.data;
};

export const useGetValentineCoin = () =>
  useSuspenseQuery({
    queryKey: ['valentine-coin'],
    queryFn: valentineCoin,
  });

export const useGetValentineCharacter = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: gachaValentineAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      queryClient.invalidateQueries({ queryKey: ['valentine-coin'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutateAsync;
};
