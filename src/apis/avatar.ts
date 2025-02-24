import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BaseRarity } from '@/lib/type';

import { api } from './core';

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

interface ResetAvatarResponse {
  message?: string;
}

export const gachaAvatar = async (count: number) => {
  const result = await api.post<AvatarList>('/gacha/draw', { count });

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '가챠 뽑기에 실패했습니다.');
  }

  return result.data;
};

export const getAvatarList = async () => {
  const result = await api.get<AvatarList>('/avatar');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '아바타 목록을 불러오는데 실패했습니다.');
  }

  return result.data;
};

const resetAvatar = async () => {
  const result = await api.patch<ResetAvatarResponse>('/user/me/avatar/reset');

  if (!result.isSuccess) {
    throw new Error(result.message || '아바타 초기화에 실패했습니다.');
  }

  return result.data;
};

export const useResetAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: resetAvatar,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success(data?.message || '모든 캐릭터가 초기화되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useGetAvatarList = () =>
  useSuspenseQuery<AvatarList>({
    queryKey: ['avatarList'],
    queryFn: getAvatarList,
  });

export const useGachaAvatarApi = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: gachaAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      queryClient.invalidateQueries({ queryKey: ['user-point'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutateAsync;
};
