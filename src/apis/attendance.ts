import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

// 출석한 날짜
interface Records {
  date: string;
  // attended: boolean;
}

// 냥코인 버튼 클릭: 오늘, 문제 풀었는지 확인 요청
export const checkProblem = async () => {
  const result = await api.post('/attendance/reward');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};

// 출석 기록 조회(달력에 도장)
export const getRecords = async () => {
  const result = await api.get<Records>('/attendance/records');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
};

// 사용자 동기부여 메시지 조회
// export const getMessage = async () => {
//   const result = await api.get('');
//   if (!result.isSuccess || !result.data) {
//     throw new Error(result.message);
//   }

//   return result.data;
// };

export const useCheckProblem = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: checkProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReward'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useRecords = () =>
  useQuery({
    queryKey: ['attendanceRecords'],
    queryFn: getRecords,
  });
