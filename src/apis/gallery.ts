import { useSuspenseQuery } from '@tanstack/react-query';

import { Rarity } from '@/pages/sale/type';

import { domain } from './avatar';

export interface AvatarGallery {
  name: string;
  rarity: Rarity;
  owned: boolean;
}

interface AvatarGalleryList {
  collections: AvatarGallery[];
}

export const getAvatarGallery = async () =>
  await fetch(`${domain}/user/me/collection`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as AvatarGalleryList);

export const useGetAvatarGallery = () =>
  useSuspenseQuery({
    queryKey: ['galleryList'],
    queryFn: getAvatarGallery,
  });
