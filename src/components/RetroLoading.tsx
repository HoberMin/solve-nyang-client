import { useEffect, useState } from 'react';

const RetroLoading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex h-[calc(100vh-4rem)] w-full items-center justify-center'>
      {/* 격자 패턴 배경 */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
        }}
      />

      <div className='relative'>
        {/* 메인 콘텐츠 */}
        <div className='flex flex-col items-center gap-6'>
          {/* 픽셀 아트 스타일 로딩 아이콘 */}
          <svg
            width='60'
            height='60'
            viewBox='0 0 80 80'
            className='animate-spin'
          >
            <rect x='35' y='10' width='10' height='10' fill='#3B82F6' />
            <rect x='60' y='35' width='10' height='10' fill='#60A5FA' />
            <rect x='35' y='60' width='10' height='10' fill='#1D4ED8' />
            <rect x='10' y='35' width='10' height='10' fill='#2563EB' />
          </svg>

          {/* 로딩 텍스트 */}
          <div
            className='bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-xl text-transparent'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
            }}
          >
            LOADING{dots}
          </div>

          {/* 레트로 스타일 진행 바 */}
          <div className='relative h-3 w-48 overflow-hidden rounded border-2 border-blue-500/30 bg-gray-800/50'>
            <div className='absolute inset-0 opacity-50'>
              <div className='h-0.5 w-0.5 bg-blue-400' />
              <div className='absolute right-0 top-0 h-0.5 w-0.5 bg-blue-400' />
              <div className='absolute bottom-0 h-0.5 w-0.5 bg-blue-400' />
              <div className='absolute bottom-0 right-0 h-0.5 w-0.5 bg-blue-400' />
            </div>
            <div className='h-full animate-retro-progress bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600' />
          </div>

          {/* 팁 메시지 */}
          <div
            className='animate-retro-fade text-xs text-blue-400'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
            }}
          >
            백준문제를 풀어 포인트를 획득하세요!
          </div>
        </div>
      </div>

      {/* 스캔라인 효과 */}
      <div
        className='animate-scanline pointer-events-none absolute inset-0 opacity-5'
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(59, 130, 246, 0.2) 2px, rgba(59, 130, 246, 0.2) 2px)',
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
};

export default RetroLoading;
