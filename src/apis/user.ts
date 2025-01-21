import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Rarity } from '@/pages/profile/AvatarCollection';

import { domain } from './avatar';

export interface UserAvatar {
  ownedAvatarId: string; // 고유값
  name: string;
  rarity: Rarity;
  dropRate: number;
  visible: boolean;
}

interface UserAvatarList {
  avatars: UserAvatar[];
}

interface UserInfo {
  nickname: string;
  point: number;
  solvedacStrick: number;
  solvedCount: number;
  solvedacTier: number;
}

const userInfo = async () => {
  const response = await fetch(`${domain}/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  return data as UserInfo;
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

export const useGetUserInfo = () =>
  useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: userInfo,
  });

export const useGetUserAvatar = () =>
  useQuery({
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
