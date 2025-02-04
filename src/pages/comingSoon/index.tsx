import { Construction } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='h-screen w-screen bg-black'>
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div className='rounded-lg bg-gray-800/50 p-8 text-center backdrop-blur-sm'>
          <div className='relative inline-flex items-center text-[120px] font-bold text-gray-400'>
            <Construction className='h-20 w-20 text-amber-400' />
          </div>

          <h2 className='mt-6 text-2xl font-bold text-amber-400'>
            서비스 준비중입니다
          </h2>

          <p className='mt-4 text-lg text-gray-200'>
            더 나은 서비스로 찾아뵙겠습니다
          </p>

          <div className='mt-6 space-y-2 text-gray-400'>
            <p className='text-sm'>조금만 기다려주세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
