import { Cat, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 px-4'>
      <div className='rounded-lg bg-gray-800/50 p-8 text-center backdrop-blur-sm'>
        <div className='relative inline-flex items-center text-[120px] font-bold text-gray-400'>
          <span className='opacity-20'>4</span>
          <div className='mx-2 flex h-24 w-24 items-center justify-center'>
            <Cat className='h-20 w-20 animate-bounce text-amber-400' />
          </div>
          <span className='opacity-20'>4</span>
        </div>

        <h2 className='mt-6 text-2xl font-bold text-amber-400'>
          앗! 길을 잃었나요? 🐱
        </h2>

        <p className='mt-4 text-lg text-gray-200'>
          찾으시는 페이지를 발견하지 못했어요 <br />
        </p>

        <div className='mt-6 space-y-2 text-gray-400'>
          <p className='text-sm'>고양이가 길을 찾아드릴게요!</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className='mx-auto mt-8 flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-gray-900 transition-colors hover:bg-amber-500'
        >
          <HomeIcon className='h-5 w-5' />
          <span>메인으로 돌아가기</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
