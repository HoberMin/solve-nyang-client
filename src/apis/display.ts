import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface UserDisplayInfo {
  title: string;
  titleVisible: boolean;
  tierVisible: boolean;
  memberClassVisible: boolean;
  solvedCountVisible: boolean;
  streakVisible: boolean;
}

const getUserDisplayInfo = async () => {
  const result = await api.get<UserDisplayInfo>('/display');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '사용자 정보를 불러오는데 실패했습니다.');
  }

  return result.data;
};

const tierToggle = async () => {
  const result = await api.patch(`/display/tier`);

  if (!result.isSuccess) {
    throw new Error(result.message || '티어 표시 설정 변경에 실패했습니다.');
  }
};

const streakToggle = async () => {
  const result = await api.patch(`/display/streak`);

  if (!result.isSuccess) {
    throw new Error(result.message || '스트릭 표시 설정 변경에 실패했습니다.');
  }
};

const classToggle = async () => {
  const result = await api.patch(`/display/class`);

  if (!result.isSuccess) {
    throw new Error(result.message || '등급 표시 설정 변경에 실패했습니다.');
  }
};

const titleToggle = async () => {
  const result = await api.patch(`/display/title`);

  if (!result.isSuccess) {
    throw new Error(result.message || '칭호 표시 설정 변경에 실패했습니다.');
  }
};

const solvedToggle = async () => {
  const result = await api.patch(`/display/solved`);

  if (!result.isSuccess) {
    throw new Error(
      result.message || '해결한 문제 수 표시 설정 변경에 실패했습니다.',
    );
  }
};

const changeTitle = async (title: string) => {
  const result = await api.patch(`/display/user-title`, { title });

  if (!result.isSuccess) {
    throw new Error(result.message || '타이틀 변경에 실패했습니다.');
  }
};

export const useGetUserDisplayInfo = () =>
  useSuspenseQuery({
    queryKey: ['user-display'],
    queryFn: () => getUserDisplayInfo(),
  });

export const usePatchTitle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (title: string) => changeTitle(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const usePatchSolvedToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: solvedToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const usePatchTierToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: tierToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const usePatchStreakToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: streakToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const usePatchClassToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: classToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const usePatchTitleToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: titleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-display'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
