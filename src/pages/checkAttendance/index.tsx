import Layout from '@/components/Layout';

import PointDisplay from '../gacha/components/PointDisplay';
import AttendanceCalendar from './componenets/AttendanceCalendar';
import AttendanceStamp from './componenets/AttendanceStamp';
import TodaysProblem from './componenets/TodaysProblem';

const CheckAttendance = () => {
  return (
    <>
      <Layout>
        <div className='text-center text-white'>
          <div className='text-3xl'>출석체크하고 냥코인 받자!</div>
          <p className='text-xl'>월~금 연속 출석 시 추가포인트 지급</p>
          <p className='text-xl'>한달 개근 시 추가포인트 지급</p>
        </div>
        <div className='flex'>
          <div>
            <PointDisplay />
          </div>
          <div>
            <AttendanceStamp />
            <AttendanceCalendar />
          </div>
          <div>
            <TodaysProblem />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default CheckAttendance;
