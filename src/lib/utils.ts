import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { BACKGROUND_MAPPING } from '@/constant/backgroundMapping';
import { CAT_MAPPINGS } from '@/constant/catMapping';

import { BackgroundKey } from './type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentTimeZoneOffset = date.getTimezoneOffset() / 60;
  date.setHours(date.getHours() - currentTimeZoneOffset);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export const getCatKorName = (engName: string): string => {
  return CAT_MAPPINGS[engName]?.korName || engName;
};

export const getKoreanName = (key: BackgroundKey): string => {
  return BACKGROUND_MAPPING[key];
};
