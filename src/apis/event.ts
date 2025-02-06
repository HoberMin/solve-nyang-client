import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { axiosInstance } from './auth';

interface GetEventParticipantResponse {
  hasEventAvatar: boolean;
}

export const getEventParticipant = async () => {
  const response = await axiosInstance.get('/gacha/event');

  return response.data as GetEventParticipantResponse;
};

export const getEventAvatar = async () => {
  const response = await axiosInstance.post('/gacha/event');

  return response.data;
};

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

export const submitContestAvatar = async (payload: ContestAvatarPayload) => {
  const response = await axiosInstance.post('/image', payload);

  return response.data;
};

export const useSubmitContestAvatar = () => {
  const { mutate } = useMutation({
    mutationFn: (payload: ContestAvatarPayload) => submitContestAvatar(payload),
    onSuccess: () => {
      toast.success('공모전 이미지 제출을 성공했습니다 !');
    },
  });

  return mutate;
};
