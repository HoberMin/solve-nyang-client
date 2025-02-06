import { useSuspenseQuery } from '@tanstack/react-query';

import { BaseRarity } from '@/lib/type';

import { domain } from './avatar';

export interface AvatarGallery {
  name: string;
  rarity: BaseRarity;
  owned: boolean;
}

interface AvatarGalleryList {
  collections: AvatarGallery[];
}

export const getAvatarGallery = async () =>
  await fetch(`${domain}/user/me/collection`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => data as AvatarGalleryList);

export const useGetAvatarGallery = () =>
  useSuspenseQuery({
    queryKey: ['galleryList'],
    queryFn: getAvatarGallery,
  });
