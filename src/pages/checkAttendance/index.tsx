import Layout from '@/components/Layout';

import PointDisplay from '../gacha/components/PointDisplay';
import AttendanceCalendar from './componenets/AttendanceCalendar';
import TodaysProblem from './componenets/TodaysProblem';

const CheckAttendance = () => {
  return (
    <>
      <Layout>
        <div className='mb-14 mt-20 flex justify-center gap-10'>
          <div className='space-y-3 text-center text-white'>
            <div className='text-3xl'>알고리즘 풀고 냥코인 받자!</div>
            <p className='text-xl'>월 ~ 일 연속 풀이 시 추가 포인트 지급</p>
          </div>
          <PointDisplay />
        </div>
        <div className='flex justify-center'>
          <div className='flex justify-center gap-10'>
            <div>
              <AttendanceCalendar />
            </div>
            <div className='flex h-full items-center'>
              <TodaysProblem />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default CheckAttendance;
