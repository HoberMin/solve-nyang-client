import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useGetRecords } from '@/apis/attendance';

// interface AttendanceResponse {
//   attendances: {
//     date: string;
//   }[];
// }

// interface Attendance {
//   date: string;
// }

// interface Records {
//   attendances: Attendance[];
// }

export const AttendanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today] = useState(new Date()); // 오늘 날짜 상태
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // const { data } = useGetRecords<Records>();
  const { data } = useGetRecords();
  const attendanceData = data?.attendance || [];

  // 6개월 전 날짜 계산
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // 현재 표시 중인 달이 제한 범위 내에 있는지 확인
  const isBeforeSixMonths = new Date(year, month - 1) < sixMonthsAgo;
  const isAfterToday =
    new Date(year, month - 1) > new Date(today.getFullYear(), today.getMonth());

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month - 1, 1);
    const days: Date[] = [];
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 2, 1);
    if (newDate >= sixMonthsAgo) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month, 1);
    if (newDate <= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentDate(newDate);
    }
  };

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

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const days = getDaysInMonth(year, month);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDay = days[0].getDay();
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => {
    return new Date(year, month - 1, 0 - i);
  }).reverse();

  const lastDay = days[days.length - 1].getDay();
  const nextMonthDays = Array.from({ length: 6 - lastDay }, (_, i) => {
    return new Date(year, month, i + 1);
  });

  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

  return (
    <div className='mx-auto w-full max-w-lg'>
      <div className='mb-4 flex items-center justify-between'>
        {!isBeforeSixMonths && (
          <button
            onClick={handlePrevMonth}
            className='rounded p-2 hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronLeft className='h-3 w-3' />
          </button>
        )}
        {isBeforeSixMonths && <div className='w-7' />}

        <p className='text-2xl text-white'>{`${year}년 ${month}월`}</p>

        {!isAfterToday && (
          <button
            onClick={handleNextMonth}
            className='rounded p-2 hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronRight className='h-3 w-3' />
          </button>
        )}
        {isAfterToday && <div className='w-7' />}
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {weekdays.map(day => (
          <div key={day} className='py-2 text-center text-xl text-white'>
            {day}
          </div>
        ))}

        {allDays.map(day => {
          const isToday = isSameDay(day, today);
          const isPast = isBeforeDay(day, today);
          // const isFuture = isAfterDay(day, today);
          const isCurrentMonth = day.getMonth() === month - 1;
          const hasAttendance = attendanceData.some(
            record => record.data === formatDate(day),
          );

          const bgColorClass = isToday ? 'bg-gray-200/70' : 'bg-white';
          const textColorClass = !isCurrentMonth
            ? 'text-gray-400'
            : isToday
              ? 'text-black'
              : isPast
                ? 'text-gray-400'
                : 'text-black';

          return (
            <div
              key={day.toISOString()}
              className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border text-center ${bgColorClass} ${textColorClass}`}
              tabIndex={0}
            >
              {day.getDate()}
              {hasAttendance && (
                <div className='absolute inset-0'>
                  <img
                    src='/stamp.svg'
                    alt='출석도장'
                    className='h-full w-full scale-150 object-cover'
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
