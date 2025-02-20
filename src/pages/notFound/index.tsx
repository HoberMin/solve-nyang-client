import { Cat, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='h-screen w-screen bg-black'>
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div className='rounded-lg bg-gray-800/50 p-8 text-center backdrop-blur-sm'>
          <div className='relative inline-flex items-center text-[120px] font-bold text-amber-400'>
            <Cat className='mx-2 h-20 w-20' strokeWidth={2.5} />
          </div>

          <h2 className='mt-4 text-2xl font-bold text-amber-400'>
            페이지를 찾을 수 없습니다
          </h2>

          <p className='mt-6 text-lg text-gray-200'>
            요청하신 페이지가 존재하지 않거나 삭제되었습니다
          </p>

          <div className='mt-1 text-gray-400'>
            올바른 주소인지 확인해 주세요
          </div>

          <button
            onClick={handleGoHome}
            className='mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-medium text-black transition-colors hover:bg-amber-500'
          >
            <Home className='h-5 w-5' />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
