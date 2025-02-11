import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

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

export interface VoteResponse {
  success: boolean;
  message?: string;
}

interface VoteCount {
  imageId: number;
  count: number;
}

export interface VoteResultResponse {
  voteCounts: VoteCount[];
}

interface VoteStatusResponse {
  voted: boolean;
}

const getImgUrl = async () => {
  const result = await api.get<ImageList>('/images/contest');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '이미지를 가져오는 데 실패했습니다.');
  }

  return result.data;
};

const voteImage = async (imageId: number) => {
  const result = await api.patch<VoteResponse>(`/images/vote/${imageId}`);

  if (!result.isSuccess) {
    throw new Error(result.message || '투표하는 데 실패했습니다.');
  }
};

const getVoteResult = async () => {
  const result = await api.get<VoteResultResponse>('/images/votes');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '투표 결과를 불러오는 데 실패했습니다.');
  }

  return result.data;
};

const getVoteStatus = async () => {
  const result = await api.get<VoteStatusResponse>('/images/voted');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '투표 상태를 확인하는 데 실패했습니다.');
  }

  return result.data;
};

export const useGetImgUrl = () =>
  useSuspenseQuery<ImageList>({
    queryKey: ['imageList'],
    queryFn: getImgUrl,
  });

export const useVoteImage = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: voteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voteResult'] });
      queryClient.invalidateQueries({ queryKey: ['voteStatus'] });
      toast.success('오늘의 투표가 완료되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useGetVoteResult = () =>
  useSuspenseQuery<VoteResultResponse>({
    queryKey: ['voteResult'],
    queryFn: getVoteResult,
  });

export const useGetVoteStatus = () =>
  useSuspenseQuery<VoteStatusResponse>({
    queryKey: ['voteStatus'],
    queryFn: getVoteStatus,
  });
