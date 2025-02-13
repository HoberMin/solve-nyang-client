import { Link } from 'react-router-dom';

import AttendanceImg from '@/assets/laboratory/attendance.png';
import MemoryGameImg from '@/assets/laboratory/memory-game.png';
import NameGameImg from '@/assets/laboratory/name-game.png';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const LaboratoryPage = () => {
  return (
    <Layout>
      <div className='flex w-full justify-center px-4'>
        <div className='mt-4 w-full max-w-4xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* 출석체크 카드 */}
            <Link
              to='/attendance'
              className='block transition-transform hover:scale-105'
            >
              <Card className='cursor-pointer overflow-hidden'>
                <CardContent className='p-0'>
                  <div className='group relative w-full'>
                    <img
                      src={AttendanceImg}
                      alt='Attendance Check'
                      width={400}
                      height={300}
                      className='h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/60'>
                      <h2 className='text-center text-2xl font-bold text-white [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]'>
                        출석 체크
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 이름 게임 카드 */}
            <Link
              to='/name-game'
              className='block transition-transform hover:scale-105'
            >
              <Card className='cursor-pointer overflow-hidden'>
                <CardContent className='p-0'>
                  <div className='group relative w-full'>
                    <img
                      src={NameGameImg}
                      alt='name-game'
                      width={400}
                      height={300}
                      className='h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/60'>
                      <h2 className='text-center text-2xl font-bold text-white [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]'>
                        냥냥핑 이름 맞추기
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 메모리 게임 카드 */}
            <Link
              to='/memory-game'
              className='block transition-transform hover:scale-105'
            >
              <Card className='cursor-pointer overflow-hidden'>
                <CardContent className='p-0'>
                  <div className='group relative w-full'>
                    <img
                      src={MemoryGameImg}
                      alt='memory-game'
                      width={400}
                      height={300}
                      className='h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/60'>
                      <h2 className='text-center text-2xl font-bold text-white [text-shadow:_2px_2px_0_rgb(0_0_0),_-2px_-2px_0_rgb(0_0_0),_2px_-2px_0_rgb(0_0_0),_-2px_2px_0_rgb(0_0_0)]'>
                        냥냥 메모리 게임
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LaboratoryPage;
