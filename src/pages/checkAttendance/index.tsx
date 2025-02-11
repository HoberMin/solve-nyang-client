import Layout from '@/components/Layout';

import PointDisplay from '../gacha/components/PointDisplay';
import AttendanceCalendar from './componenets/AttendanceCalendar';
import TodaysReward from './componenets/TodaysReward';

const CheckAttendance = () => {
  return (
    <Layout>
      <div className='relative mx-auto mb-8 flex h-full max-w-4xl flex-col'>
        <div className='sticky top-0 z-10 flex bg-gray-900/95 px-4 py-4 backdrop-blur-sm'>
          <div className='flex-1'>
            <div className='mt-4 text-center text-3xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              알고리즘 풀고 냥코인 받자!
              <p className='mt-2 text-lg text-gray-400'>
                7일 연속 풀이 시 추가 포인트 지급
              </p>
            </div>
          </div>
          <div className='mx-4'>
            <PointDisplay />
          </div>
        </div>
        <div className='mx-auto w-full px-4 py-12'>
          <div className='flex justify-center gap-20'>
            <div>
              <AttendanceCalendar />
            </div>
            <div className='flex h-full items-center'>
              <TodaysReward />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CheckAttendance;
