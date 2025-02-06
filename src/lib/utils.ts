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

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export const getCatKorName = (engName: string): string => {
  return CAT_MAPPINGS[engName]?.korName || engName;
};

export const getKoreanName = (key: BackgroundKey): string => {
  return BACKGROUND_MAPPING[key];
};
