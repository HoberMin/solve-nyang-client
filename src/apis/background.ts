import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BackgroundKey } from '@/lib/type';

import { api } from './core';

export interface Background {
  id: string;
  name: BackgroundKey;
  price: number;
  owned: boolean;
}

interface BackgroundList {
  backgrounds: Background[];
}

export interface OwnedBackground {
  id: string;
  name: BackgroundKey;
  visible: boolean;
}

interface OwnedBackgroundList {
  backgrounds: OwnedBackground[];
}

interface BackgroundResponse {
  message?: string;
}

const getBackground = async () => {
  const result = await api.get<BackgroundList>('/background');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '배경 목록을 불러오는데 실패했습니다.');
  }

  return result.data;
};

const getUserBackground = async () => {
  const result = await api.get<OwnedBackgroundList>('/background/owned');

  if (!result.isSuccess || !result.data) {
    throw new Error(
      result.message || '보유한 배경 목록을 불러오는데 실패했습니다.',
    );
  }

  return result.data;
};

const changeUserBackground = async (ownedBackgroundId: string) => {
  const result = await api.patch<BackgroundResponse>(
    `/background/owned/${ownedBackgroundId}`,
  );

  if (!result.isSuccess) {
    throw new Error(result.message || '배경 변경에 실패했습니다.');
  }

  return result.data;
};

const buyBackground = async (backgroundId: string) => {
  const result = await api.post<BackgroundResponse>(
    `/background/${backgroundId}`,
  );

  if (!result.isSuccess) {
    throw new Error(result.message || '배경 구매에 실패했습니다.');
  }

  return result.data;
};

export const useGetBackgroundImage = () =>
  useSuspenseQuery<BackgroundList>({
    queryKey: ['background-image'],
    queryFn: getBackground,
  });

export const useGetUserBackgroundImage = () =>
  useSuspenseQuery<OwnedBackgroundList>({
    queryKey: ['user-background-image'],
    queryFn: getUserBackground,
  });

export const useChangeBackgroundAPI = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: changeUserBackground,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['user-background-image'] });
      toast.success(data?.message || '배경이 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useBuyBackgroundImage = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: buyBackground,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['user-background-image'] });
      queryClient.invalidateQueries({ queryKey: ['background-image'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success(data?.message || '배경을 구매했습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
