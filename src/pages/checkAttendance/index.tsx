import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 출석체크 도장 SVG 컴포넌트
const AttendanceStamp: React.FC = () => (
  <svg viewBox='0 0 100 100' className='h-8 w-8 text-red-500'>
    <circle cx='50' cy='50' r='45' fill='currentColor' opacity='0.2' />
    <path
      d='M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z'
      fill='currentColor'
    />
  </svg>
);

interface Attendance {
  date: string;
  points: number;
}

// 더미 데이터
const DUMMY_ATTENDANCE: Attendance[] = [
  { date: '2025-02-01', points: 100 },
  { date: '2025-02-02', points: 100 },
  { date: '2025-02-03', points: 100 },
];

// API 호출을 시뮬레이션하는 가상의 함수들
const fetchAttendance = async (): Promise<Attendance[]> => {
  // 실제 API 호출 대신 더미 데이터 반환
  return DUMMY_ATTENDANCE;
};

const markAttendance = async (date: string): Promise<Attendance> => {
  // 실제 API 호출 대신 더미 응답 반환
  console.log('출석체크:', date);
  return { date, points: 100 };
};

const AttendanceCalendar: React.FC = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const queryClient = useQueryClient();

  // 출석 데이터 조회
  const { data: attendanceData = [] } = useQuery({
    queryKey: ['attendance', year, month],
    queryFn: fetchAttendance,
  });

  // 출석체크 뮤테이션
  const { mutate } = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });

  // 해당 월의 모든 날짜 생성
  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month - 1, 1);
    const days: Date[] = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(year, month);

  // 요일 헤더
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 비교 헬퍼 함수들
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isBeforeDay = (date1: Date, date2: Date): boolean => {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return d1 < d2;
  };

  const isAfterDay = (date1: Date, date2: Date): boolean => {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return d1 > d2;
  };

  // 출석체크 처리
  const handleAttendance = (clickedDate: Date): void => {
    // 오늘 날짜만 클릭 가능
    if (!isSameDay(clickedDate, today)) return;

    const formattedDate = clickedDate.toISOString().split('T')[0];
    mutate(formattedDate);
  };

  // 이전 달의 마지막 날짜들로 첫 주 채우기
  const firstDay = days[0].getDay();
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => {
    const d = new Date(year, month - 1, 0 - i);

    return d;
  }).reverse();

  // 다음 달의 첫 날짜들로 마지막 주 채우기
  const lastDay = days[days.length - 1].getDay();
  const nextMonthDays = Array.from({ length: 6 - lastDay }, (_, i) => {
    const d = new Date(year, month, i + 1);

    return d;
  });

  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

  return (
    <div className='mx-auto mt-8 max-w-md'>
      <div className='mb-4 text-center'>
        <h2 className='text-xl font-bold'>{`${year}년 ${month}월`}</h2>
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {weekdays.map(day => (
          <div key={day} className='py-2 text-center font-medium'>
            {day}
          </div>
        ))}

        {allDays.map(day => {
          const isToday = isSameDay(day, today);
          const isPast = isBeforeDay(day, today);
          const isFuture = isAfterDay(day, today);
          const isCurrentMonth = day.getMonth() === month - 1;
          const hasAttendance = attendanceData.some(
            a => a.date === day.toISOString().split('T')[0],
          );

          return (
            <div
              key={day.toISOString()}
              className={`rounded-lg border p-2 text-center ${isToday ? 'cursor-pointer bg-blue-50' : ''} ${isPast ? 'bg-gray-100' : ''} ${isFuture ? 'bg-gray-50' : ''} ${!isCurrentMonth ? 'text-gray-400' : ''} `}
              onClick={() => handleAttendance(day)}
              role='button'
              tabIndex={0}
            >
              <div className='relative'>
                {day.getDate()}
                {hasAttendance && (
                  <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                    <AttendanceStamp />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
