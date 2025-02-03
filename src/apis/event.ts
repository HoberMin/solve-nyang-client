import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

// import { domain } from './avatar';
import { axiosInstance } from './auth';

interface GetEventParticipantResponse {
  hasEventAvatar: boolean;
}

export const getEventParticipant =
  async (): Promise<GetEventParticipantResponse> => {
    try {
      const response = await axiosInstance.get('/gacha/event');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      }
      throw error;
    }
  };

export const getEventAvatar = async (): Promise<void> => {
  try {
    await axiosInstance.post('/gacha/event');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
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
