import { useSuspenseQuery } from '@tanstack/react-query';

import { BaseRarity } from '@/lib/type';

import { api } from './core';

export interface AvatarGallery {
  name: string;
  rarity: BaseRarity;
  owned: boolean;
}

interface AvatarGalleryList {
  collections: AvatarGallery[];
}

export const getAvatarGallery = async (): Promise<AvatarGalleryList> => {
  const result = await api.get<AvatarGalleryList>('/user/me/collection');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '갤러리 정보를 불러오는데 실패했습니다.');
  }

  return result.data;
};

export const useGetAvatarGallery = () =>
  useSuspenseQuery<AvatarGalleryList>({
    queryKey: ['galleryList'],
    queryFn: getAvatarGallery,
  });
