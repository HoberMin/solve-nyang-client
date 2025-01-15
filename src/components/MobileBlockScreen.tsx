import { Cat, Monitor } from 'lucide-react';

const MobileBlockScreen = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 px-4'>
      <div className='rounded-lg bg-gray-800/50 p-8 text-center backdrop-blur-sm'>
        <div className='relative'>
          <Monitor className='mx-auto h-16 w-16 text-gray-400' />
          <Cat className='absolute -right-2 top-0 h-8 w-8 rotate-12 transform text-amber-400' />
        </div>

        <h2 className='mt-6 text-2xl font-bold text-amber-400'>잠깐만요! 🐱</h2>

        <p className='mt-4 text-lg text-gray-200'>
          냥냥이들이 더 예쁘게 보이는 <br />
          <span className='text-amber-400'>데스크톱 화면</span>으로 접속해주세요
        </p>

        <div className='mt-6 space-y-2 text-gray-400'>
          <p className='text-sm'>모바일에서는 고양이들이 답답해할 수 있어요!</p>
          <p className='text-xs text-gray-500'>권장 해상도: 1024px 이상</p>
        </div>
      </div>
    </div>
  );
};

export default MobileBlockScreen;
