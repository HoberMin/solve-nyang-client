import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { axiosInstance } from './auth';

export const domain = 'https://api.solve-nyang.com';

export type RarityType = 'S' | 'A' | 'B' | 'C' | 'D';
export interface Avatar {
  id: string; // 고유값
  avatarId: number;
  name: string;
  rarity: RarityType;
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
  try {
    const response = await axiosInstance.patch('/user/me/avatar/reset');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
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
