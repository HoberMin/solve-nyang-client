import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

// 출석한 날짜
interface Records {
  date: string;
}

export interface AttendanceResponse {
  attendances: Records[];
}

export interface WeeklyStatus {
  message: string;
}

// 냥코인 버튼 클릭: 오늘, 문제 풀었는지 확인 요청
export const checkSolvedProblem = async () => {
  const result = await api.post('/attendance/reward');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '문제 풀이 인증 중 오류가 발생했습니다.');
  }

  return result.data;
};

// 출석 기록 조회(달력에 도장)
export const getRecords = async () => {
  const result = await api.get<AttendanceResponse>('/attendance/records');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '출석 기록 조회 중 오류가 발생했습니다.');
  }

  return result.data;
};

// 사용자 동기부여 메시지 조회
export const getMessage = async () => {
  const result = await api.get<WeeklyStatus>('/attendance/weekly-status');

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '메시지 조회 중 오류가 발생했습니다.');
  }

  return result.data;
};

// 냥코인 버튼 눌렀을 때
export const useCheckSolvedProblem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: checkSolvedProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReward'] });
      queryClient.invalidateQueries({ queryKey: ['attendanceRecords'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyStatus'] });
      // toast.success(data.message || '출석 체크가 완료되었습니다!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation; // `mutation` 객체 전체 반환하여 `mutateAsync` 활용 가능하게 변경
};

export const useGetRecords = () =>
  useSuspenseQuery({
    queryKey: ['attendanceRecords'],
    queryFn: getRecords,
  });

export const useGetMessage = () =>
  useSuspenseQuery({
    queryKey: ['weeklyStatus'],
    queryFn: getMessage,
  });
