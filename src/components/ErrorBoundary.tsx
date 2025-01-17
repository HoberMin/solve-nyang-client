import { useState } from 'react';

import { Cat, Home, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RetroErrorProps {
  error?: Error | null;
}

const RetroError = ({ error }: RetroErrorProps) => {
  const navigate = useNavigate();
  const [, setIsHovered] = useState(false);

  return (
    <div className='flex min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 px-4'>
      <div className='group relative w-full max-w-sm overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm transition-all duration-300'>
        {/* Animated background gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-70' />

        <div className='relative p-8'>
          {/* Icon Section */}
          <div className='relative mx-auto mb-8 h-20 w-20'>
            <div className='absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20' />
            <div className='absolute inset-0 animate-ping rounded-full bg-amber-500/5 delay-150' />
            <Cat
              className='absolute inset-0 h-full w-full p-5 text-amber-400/90 transition-transform duration-300 group-hover:scale-110'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>

          {/* Text Section */}
          <div className='mb-8 space-y-3'>
            <h1 className='bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent'>
              앗! 문제가 발생했어요
            </h1>
            <p className='text-sm leading-relaxed text-gray-300/80'>
              {error?.message ||
                '일시적인 문제가 발생했어요. 걱정마세요, 금방 해결해드릴게요!'}
            </p>
          </div>

          {/* Buttons Section */}
          <div className='space-y-3'>
            <button
              onClick={() => navigate('/')}
              className='group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30'
            >
              <Home className='h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5' />
              <span>메인으로 돌아가기</span>
            </button>

            <button
              onClick={() => window.location.reload()}
              className='group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gray-700/50 px-4 py-2.5 text-sm font-medium text-gray-300 shadow-lg transition-all duration-300 hover:bg-gray-700/70 hover:text-white hover:shadow-xl'
            >
              <RotateCcw className='h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-180' />
              <span>다시 시도하기</span>
            </button>
          </div>

          {/* Support Message */}
          <p className='mt-6 text-center text-xs text-gray-400'>
            문제가 지속되면{' '}
            <a href='#' className='text-amber-400 hover:text-amber-300'>
              고객센터
            </a>
            로 문의해 주세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetroError;
