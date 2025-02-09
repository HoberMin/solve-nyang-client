import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BaseRarity } from '@/lib/type';

import { api } from './core';

export interface UserAvatar {
  ownedAvatarId: string;
  name: string;
  rarity: BaseRarity;
  visible: boolean;
  visibleExtension: boolean;
}

interface UserAvatarList {
  avatars: UserAvatar[];
}

export interface UserInfo {
  username: string;
  point: number;
  tier: string;
  solvedCount: number;
  streak: number;
}

export interface UserPoint {
  point: number;
}

const userInfo = async () => {
  const result = await api.get<UserInfo>('/user/me');

  if (!result.isSuccess) {
    if (result.status === 401) return null;
    throw new Error(result.message);
  }

  return result.data;
};

const userPoint = async () => {
  const result = await api.get<UserPoint>('/user/me/point');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};

const userSolvedacInfo = async () => {
  const result = await api.get<UserInfo>('/user/me/profile');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};

const userCharacterSelecte = async (ownedAvatarId: string) => {
  const result = await api.patch(`/user/me/avatar/${ownedAvatarId}`);

  if (!result.isSuccess) {
    throw new Error(result.message);
  }

  return result.data;
};

const userAvatar = async () => {
  const result = await api.get<UserAvatarList>('/user/me/avatar');

  if (!result || !result.data) {
    throw new Error('Failed to fetch avatar data');
  }

  return result.data;
};

const saleAvatar = async (avatarList: UserAvatarList) => {
  const result = await api.patch('/user/me/sale', {
    soldAvatars: avatarList.avatars.map(e => ({
      ownedAvatarId: e.ownedAvatarId,
    })),
  });

  if (!result.isSuccess) {
    throw new Error(result.message);
  }

  return result.data;
};

export const useGetUserPoint = () =>
  useSuspenseQuery<UserPoint>({
    queryKey: ['user-point'],
    queryFn: userPoint,
  });

export const useGetUserInfo = () =>
  useSuspenseQuery<UserInfo | null>({
    queryKey: ['userInfo'],
    queryFn: userInfo,
  });

export const useGetUserSolvedacInfo = () =>
  useSuspenseQuery<UserInfo>({
    queryKey: ['user-solvedac-profile'],
    queryFn: userSolvedacInfo,
  });

export const useGetUserAvatar = () =>
  useSuspenseQuery<UserAvatarList>({
    queryKey: ['userAvatar'],
    queryFn: userAvatar,
  });

export const useToggleAvatar = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: userCharacterSelecte,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('캐릭터가 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '캐릭터 변경 중 오류가 발생했습니다.');
    },
  });

  return mutate;
};

export const useSaleAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: saleAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-point'] });
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('고양이 캐릭터가 성공적으로 판매되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '판매 중 오류가 발생했습니다.');
    },
  });

  return mutate;
};
