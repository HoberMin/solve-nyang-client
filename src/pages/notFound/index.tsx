import { Cat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen w-screen bg-black'>
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div className='rounded-lg bg-gray-800/50 p-8 text-center backdrop-blur-sm'>
          <div className='relative inline-flex items-center text-[120px] font-bold text-gray-400'>
            4
            <Cat className='mx-2 h-24 w-24 text-amber-400' />4
          </div>

          <h2 className='mt-6 text-2xl font-bold text-amber-400'>
            페이지를 찾을 수 없습니다
          </h2>

          <p className='mt-4 text-lg text-gray-200'>
            요청하신 페이지가 존재하지 않거나 삭제되었습니다
          </p>

          <button
            onClick={() => navigate('/')}
            className='mt-8 rounded-lg bg-amber-400 px-6 py-2 font-semibold text-black transition-colors hover:bg-amber-500'
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
