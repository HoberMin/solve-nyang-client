import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { BackgroundKey } from '@/lib/type';

import { axiosInstance } from './auth';

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
  const response = await axiosInstance.get('/background');

  return response.data as BackgroundList;
};

export const useGetBackgroundImage = () =>
  useSuspenseQuery<BackgroundList>({
    queryKey: ['background-image'],
    queryFn: getBackground,
  });

const getUserBackground = async () => {
  const response = await axiosInstance.get('/background/owned');

  return response.data as OwnedBackgroundList;
};

export const useGetUserBackgroundImage = () =>
  useSuspenseQuery<OwnedBackgroundList>({
    queryKey: ['user-background-image'],
    queryFn: getUserBackground,
  });

const changeUserBackground = async (ownedBackgroundId: string) => {
  const response = await axiosInstance.patch(
    `/background/owned/${ownedBackgroundId}`,
  );

  return response.data;
};

export const useChangeBackgroundAPI = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (ownedBackgroundId: string) =>
      changeUserBackground(ownedBackgroundId),
  });

  return mutateAsync;
};

const buyBackground = async (backgroundId: string) => {
  const response = await axiosInstance.post(`/background/${backgroundId}`);

  return response.data;
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
