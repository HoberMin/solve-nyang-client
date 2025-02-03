import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Rarity } from '@/pages/sale/type';

import { axiosInstance } from './auth';

// import { domain } from './avatar';

export interface AvatarGallery {
  name: string;
  rarity: Rarity;
  owned: boolean;
}

interface AvatarGalleryList {
  collections: AvatarGallery[];
}

export const getAvatarGallery = async (): Promise<AvatarGalleryList> => {
  try {
    const response = await axiosInstance.get('/user/me/collection');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
};

export const useGetAvatarGallery = () =>
  useSuspenseQuery({
    queryKey: ['galleryList'],
    queryFn: getAvatarGallery,
  });
