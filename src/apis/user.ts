import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { BaseRarity } from '@/lib/type';

import { axiosInstance } from './auth';
import { domain } from './avatar';

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

const userInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axiosInstance.get<UserInfo>('/user/me');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

const userCharacterSelecte = async (ownedAvatarId: string) =>
  await fetch(
    `${domain}/user/me/avatar/${ownedAvatarId}`,

    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

const userAvatar = async () => {
  const response = await fetch(`${domain}/user/me/avatar`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data as UserAvatarList;
};

const saleAvatar = async (avatarList: UserAvatarList) => {
  await fetch(`${domain}/user/me/sale`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      soldAvatars: avatarList.avatars.map(e => {
        return {
          ownedAvatarId: e.ownedAvatarId,
        };
      }),
    }),
  });
};

export const useGetUserInfo = () =>
  useSuspenseQuery<UserInfo | null>({
    queryKey: ['userInfo'],
    queryFn: userInfo,
  });

export const useGetUserAvatar = () =>
  useSuspenseQuery({
    queryKey: ['userAvatar'],
    queryFn: userAvatar,
  });

export const useToggleAvatar = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (ownedAvatarId: string) => userCharacterSelecte(ownedAvatarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
    },
  });

  return mutate;
};

export const useSaleAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatarList: UserAvatarList) => saleAvatar(avatarList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('고양이 캐릭터가 성공적으로 판매되었습니다.');
    },
    onError: error => {
      toast.error('판매 중 오류가 발생했습니다.');
      console.error('Avatar sale error:', error);
    },
  });
};
