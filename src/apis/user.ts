import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { Rarity } from '@/pages/sale/type';

import { axiosInstance } from './auth';

// import { domain } from './avatar';

export interface UserAvatar {
  ownedAvatarId: string; // 고유값
  name: string;
  rarity: Rarity;
  visible: boolean;
  visibleExtension: boolean;
}

interface UserAvatarList {
  avatars: UserAvatar[];
}

interface UserInfo {
  username: string;
  point: number;
  tier: string;
  solvedCount: number;
  streak: number;
}

const userInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axiosInstance.get('user/me');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

const userCharacterSelecte = async (ownedAvatarId: string) => {
  const response = await axiosInstance.patch(
    `/user/me/avatar/${ownedAvatarId}`,
  );

  return response.data;
};

const userAvatar = async () => {
  try {
    const response = await axiosInstance.get('/user/me/avatar');

    return response.data as UserAvatarList;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Avatar fetch error:', error);
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
};

const saleAvatar = async (avatarList: UserAvatarList) => {
  try {
    await axiosInstance.patch('/user/me/sale', {
      soldAvatars: avatarList.avatars.map(e => ({
        ownedAvatarId: e.ownedAvatarId,
      })),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
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
