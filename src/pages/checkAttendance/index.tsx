import Layout from '@/components/Layout';

import AttendanceCalendar from './componenets/AttendanceCalendar';
import AttendanceStamp from './componenets/AttendanceStamp';

const CheckAttendance = () => {
  return (
    <>
      <Layout>
        <AttendanceStamp />
        <AttendanceCalendar />
      </Layout>
    </>
  );
};
export default CheckAttendance;
