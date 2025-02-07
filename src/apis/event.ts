import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface GetEventParticipantResponse {
  hasEventAvatar: boolean;
}

interface EventAvatarResponse {
  message?: string;
}

interface ContestAvatarPayload {
  originalFilename: string;
  storedFilename: string;
}

interface ContestAvatarResponse {
  message?: string;
}

export const getEventParticipant = async () => {
  const result = await api.get<GetEventParticipantResponse>('/gacha/event');

  if (!result.isSuccess || !result.data) {
    throw new Error(
      result.message || '이벤트 참여 정보를 불러오는데 실패했습니다.',
    );
  }

  return result.data;
};

export const getEventAvatar = async () => {
  const result = await api.post<EventAvatarResponse>('/gacha/event');

  if (!result.isSuccess) {
    throw new Error(result.message || '이벤트 아바타 획득에 실패했습니다.');
  }

  return result.data;
};

export const submitContestAvatar = async (payload: ContestAvatarPayload) => {
  const result = await api.post<ContestAvatarResponse>('/image', payload);

  if (!result.isSuccess) {
    throw new Error(result.message || '공모전 이미지 제출에 실패했습니다.');
  }

  return result.data;
};

export const useGetEventParticipant = () =>
  useSuspenseQuery<GetEventParticipantResponse>({
    queryKey: ['event-participant'],
    queryFn: getEventParticipant,
  });

export const useGetEventAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: getEventAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-participant'] });
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      // toast.success(data.message || '새해복냥을 획득했습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useSubmitContestAvatar = () => {
  const { mutate } = useMutation({
    mutationFn: submitContestAvatar,
    onSuccess: data => {
      toast.success(data?.message || '공모전 이미지 제출을 성공했습니다!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
