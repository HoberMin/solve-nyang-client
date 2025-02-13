//
import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useGetRecords } from '@/apis/attendance';

export const AttendanceCalendar: React.FC = () => {
  const [today] = useState(() => {
    const now = new Date();

    return new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();

    return new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
  });

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth() + 1;

  const { data } = useGetRecords();
  const attendanceData = data?.attendances || [];

  const convertToUTCDate = (dateStr: string): Date => {
    const date = new Date(dateStr);

    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  };

  const sixMonthsAgo = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth() - 6,
      today.getUTCDate(),
    ),
  );

  const isBeforeSixMonths = new Date(Date.UTC(year, month - 1)) < sixMonthsAgo;
  const isAfterToday =
    new Date(Date.UTC(year, month - 1)) >
    new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth()));

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(Date.UTC(year, month - 1, 1));
    const days: Date[] = [];
    while (date.getUTCMonth() === month - 1) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(Date.UTC(year, month - 2, 1));
    if (newDate >= sixMonthsAgo) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(Date.UTC(year, month, 1));
    if (
      newDate <=
      new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
    ) {
      setCurrentDate(newDate);
    }
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getUTCDate() === date2.getUTCDate() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCFullYear() === date2.getUTCFullYear()
    );
  };

  const isBeforeDay = (date1: Date, date2: Date): boolean => {
    const d1 = new Date(
      Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate()),
    );
    const d2 = new Date(
      Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()),
    );

    return d1 < d2;
  };

  const days = getDaysInMonth(year, month);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDay = days[0].getUTCDay();
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => {
    return new Date(Date.UTC(year, month - 1, -i));
  }).reverse();

  const lastDay = days[days.length - 1].getUTCDay();
  const nextMonthDays = Array.from({ length: 6 - lastDay }, (_, i) => {
    return new Date(Date.UTC(year, month, i + 1));
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
          const isCurrentMonth = day.getUTCMonth() === month - 1;

          const hasAttendance = attendanceData.some(record => {
            const utcAttendanceDate = convertToUTCDate(record.date);

            return isSameDay(utcAttendanceDate, day);
          });

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
              {day.getUTCDate()}
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
