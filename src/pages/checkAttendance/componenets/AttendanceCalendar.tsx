import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Attendance {
  date: string;
  points: number;
}

// 더미 데이터
const DUMMY_ATTENDANCE: Attendance[] = [
  { date: '2025-02-01', points: 30 },
  { date: '2025-02-03', points: 30 },
  { date: '2025-02-06', points: 30 },
  { date: '2025-02-09', points: 30 },
];

// API 호출을 시뮬레이션하는 가상의 함수들
const fetchAttendance = async (): Promise<Attendance[]> => {
  return DUMMY_ATTENDANCE;
};

// const markAttendance = async (date: string): Promise<Attendance> => {
//   console.log('출석체크:', date);
//   return { date, points: 100 };
// };

export const AttendanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today] = useState(new Date()); // 오늘 날짜 상태
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // const queryClient = useQueryClient();

  const { data: attendanceData = [] } = useQuery({
    queryKey: ['attendance', year, month],
    queryFn: fetchAttendance,
  });

  // const { mutate } = useMutation({
  //   mutationFn: markAttendance,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['attendance'] });
  //   },
  // });

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
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  // const isSameDay = (date1: Date, date2: Date): boolean => {
  //   return (
  //     date1.getFullYear() === date2.getFullYear() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getDate() === date2.getDate()
  //   );
  // };

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

  // const isAfterDay = (date1: Date, date2: Date): boolean => {
  //   const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  //   const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  //   return d1 > d2;
  // };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // const handleAttendance = (clickedDate: Date): void => {
  //   if (!isSameDay(clickedDate, today)) return;
  //   const formattedDate = clickedDate.toISOString().split('T')[0];
  //   mutate(formattedDate);
  // };

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
        <button
          onClick={handlePrevMonth}
          className='rounded p-2 hover:bg-gray-100'
        >
          <ChevronLeft className='h-3 w-3' />
        </button>
        <p className='text-2xl text-white'>{`${year}년 ${month}월`}</p>
        <button
          onClick={handleNextMonth}
          className='rounded p-2 hover:bg-gray-100'
        >
          <ChevronRight className='h-3 w-3' />
        </button>
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
            a => a.date === formatDate(day),
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
              // onClick={() => handleAttendance(day)}
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
