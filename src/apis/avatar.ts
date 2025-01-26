import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { RarityType } from '@/pages/catCollection/components/RaritySection';

export const domain = 'https://api.solve-nyang.com';

export interface Avatar {
  id: string; // 고유값
  avatarId: number;
  name: string;
  rarity: RarityType;
  dropRate: number;
}

export interface AvatarList {
  avatars: Avatar[];
}

export const gachaAvatar = async (count: number) =>
  await fetch(`${domain}/gacha/draw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      count,
    }),
  })
    .then(res => res.json())
    .then(data => data as AvatarList);

export const getAvatarList = async () =>
  await fetch(`${domain}/avatar`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as AvatarList);

const resetAvatar = async () => {
  const response = await fetch(`${domain}/user/me/avatar/reset`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const useResetAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('모든 캐릭터가 초기화되었습니다.');
    },
    onError: () => {
      toast.error('초기화 중 오류가 발생했습니다.');
    },
  });
};

export const useGetAvatarList = () =>
  useSuspenseQuery({
    queryKey: ['avatarList'],
    queryFn: getAvatarList,
  });

export const useGachaAvatarApi = () => {
  const { mutateAsync } = useMutation<AvatarList, Error, number>({
    mutationFn: (count: number) => gachaAvatar(count),
  });

  return mutateAsync;
};
