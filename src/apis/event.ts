import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { domain } from './avatar';

interface GetEventParticipantResponse {
  hasEventAvatar: boolean;
}

export const getEventParticipant = async () =>
  await fetch(`${domain}/gacha/event`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => data as GetEventParticipantResponse);

export const getEventAvatar = async () =>
  await fetch(`${domain}/gacha/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const useGetEventParticipant = () =>
  useSuspenseQuery({
    queryKey: ['event-participant'],
    queryFn: getEventParticipant,
  });

export const useGetEventAvatar = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => getEventAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-participant'] });
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('새해복냥을 획득했습니다.');
    },
  });

  return mutateAsync;
};

interface ContestAvatarPayload {
  originalFilename: string;
  storedFilename: string;
}

export const submitContestAvatar = async (payload: ContestAvatarPayload) =>
  await fetch(`${domain}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

export const useSubmitContestAvatar = () => {
  const { mutate } = useMutation({
    mutationFn: (payload: ContestAvatarPayload) => submitContestAvatar(payload),
    onSuccess: () => {
      toast.success('공모전 이미지 제출을 성공했습니다 !');
    },
  });

  return mutate;
};
