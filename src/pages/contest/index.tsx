import { CalendarRange } from 'lucide-react';

import Layout from '@/components/Layout';

const Contest = () => {
  return (
    <Layout>
      <div className='flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b px-4'>
        <div className='mx-auto max-w-2xl rounded-2xl bg-white/5 p-8 text-center shadow-lg backdrop-blur-sm'>
          <h1 className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text p-3 text-4xl font-bold text-transparent'>
            Coming Soon
          </h1>
          <div className='space-y-3'>
            <p className='text-xl text-white'>솔브냥의 새로운 아바타가 될</p>
            <p className='mb-8 text-xl text-white'>
              여러분의 고양이 그림을 기다립니다
            </p>

            <div className='inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2'>
              <CalendarRange className='h-5 w-5 text-blue-600' />
              <span className='font-medium text-blue-600'>
                2025년 2월 5일 Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contest;
