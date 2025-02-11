import { useSuspenseQuery } from '@tanstack/react-query';

import { api } from './core';

export interface Image {
  imageId: number;
  presignedUrl: string;
  memberId: number;
  username: string;
}

export interface ImageList {
  images: Image[];
}

const getImgUrl = async () => {
  const result = await api.get<ImageList>('/images/contest');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '이미지를 가져오는 데 실패했습니다.');
  }

  return result.data;
};

export const useGetImgUrl = () =>
  useSuspenseQuery<ImageList>({
    queryKey: ['imageList'],
    queryFn: getImgUrl,
  });
