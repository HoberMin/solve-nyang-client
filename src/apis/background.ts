import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BackgroundKey } from '@/lib/type';

import { domain } from './avatar';

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

const getBackground = async () => {
  const response = await fetch(`${domain}/background`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  return data as BackgroundList;
};

export const useGetBackgroundImage = () =>
  useSuspenseQuery<BackgroundList>({
    queryKey: ['background-image'],
    queryFn: getBackground,
  });

const getUserBackground = async () => {
  const response = await fetch(`${domain}/background/owned`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  return data as OwnedBackgroundList;
};

export const useGetUserBackgroundImage = () =>
  useSuspenseQuery<OwnedBackgroundList>({
    queryKey: ['user-background-image'],
    queryFn: getUserBackground,
  });

const changeUserBackground = async (ownedBackgroundId: string) =>
  await fetch(`${domain}/background/owned/${ownedBackgroundId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const useChangeBackgroundAPI = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (ownedBackgroundId: string) =>
      changeUserBackground(ownedBackgroundId),
  });

  return mutateAsync;
};

const buyBackground = async (backgroundId: string) => {
  await fetch(`${domain}/background/${backgroundId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const useBuyBackgroundImage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (backgroundId: string) => buyBackground(backgroundId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-background-image'] });
      queryClient.invalidateQueries({ queryKey: ['background-image'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success('배경을 구매했습니다.');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return mutate;
};
