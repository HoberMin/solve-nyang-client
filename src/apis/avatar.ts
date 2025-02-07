import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BaseRarity } from '@/lib/type';

import { axiosInstance } from './auth';

export const domain = 'https://dev.api.solve-nyang.com';

export interface Avatar {
  id: string;
  avatarId: number;
  name: string;
  rarity: BaseRarity;
  dropRate: number;
}

export interface AvatarList {
  avatars: Avatar[];
}

export const gachaAvatar = async (count: number) => {
  const response = await axiosInstance.post('/gacha/draw', { count });

  return response.data as AvatarList;
};

export const getAvatarList = async () => {
  const response = await axiosInstance.get('/avatar');

  return response.data as AvatarList;
};

const resetAvatar = async () => {
  const response = await axiosInstance.patch('/user/me/avatar/reset');

  return response.data;
};

export const useResetAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('모든 캐릭터가 초기화되었습니다.');
    },
    onError: () => {
      toast.error('초기화 중 오류가 발생했습니다.');
    },
  });
};

export const useGetAvatarList = () =>
  useSuspenseQuery({
    queryKey: ['avatarList'],
    queryFn: getAvatarList,
  });

export const useGachaAvatarApi = () => {
  const { mutateAsync } = useMutation<AvatarList, Error, number>({
    mutationFn: (count: number) => gachaAvatar(count),
  });

  return mutateAsync;
};
