import { useSuspenseQuery } from '@tanstack/react-query';

import { BaseRarity } from '@/lib/type';

import { axiosInstance } from './auth';

export interface AvatarGallery {
  name: string;
  rarity: BaseRarity;
  owned: boolean;
}

interface AvatarGalleryList {
  collections: AvatarGallery[];
}

export const getAvatarGallery = async () => {
  const response = await axiosInstance('/user/me/collection');

  return response.data as AvatarGalleryList;
};

export const useGetAvatarGallery = () =>
  useSuspenseQuery({
    queryKey: ['galleryList'],
    queryFn: getAvatarGallery,
  });
