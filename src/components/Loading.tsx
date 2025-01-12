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
    <div className='flex h-screen w-screen items-center justify-center bg-gray-900'>
      {/* 격자 패턴 배경 */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `
               linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
             `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className='relative p-8'>
        {/* 화면 테두리 */}
        <div className='absolute inset-0 rounded-lg border-4 border-gray-700 bg-gray-800 shadow-2xl' />

        {/* CRT 스캔라인 효과 */}
        <div className='animate-retro-scan absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent opacity-50' />

        {/* 메인 콘텐츠 */}
        <div className='relative flex flex-col items-center gap-8 p-12'>
          {/* 메인 로고 */}
          <div
            className='text-3xl text-blue-400'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
          >
            2EIS
          </div>

          {/* 픽셀 아트 스타일 로딩 아이콘 */}
          <svg
            width='80'
            height='80'
            viewBox='0 0 80 80'
            className='animate-spin'
          >
            <rect x='35' y='10' width='10' height='10' fill='#0084ff' />
            <rect x='60' y='35' width='10' height='10' fill='#66b3ff' />
            <rect x='35' y='60' width='10' height='10' fill='#004499' />
            <rect x='10' y='35' width='10' height='10' fill='#0066cc' />
          </svg>

          {/* 로딩 텍스트 */}
          <div
            className='text-2xl font-bold text-white'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
          >
            LOADING{dots}
          </div>

          {/* 레트로 스타일 진행 바 */}
          <div className='relative h-4 w-64 overflow-hidden border-2 border-gray-600 bg-gray-700'>
            <div className='animate-retro-progress h-full bg-blue-500' />
          </div>

          {/* 팁 메시지 */}
          <div
            className='animate-retro-fade text-sm text-green-400'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            백준문제를 풀어 포인트를 획득하세요!
          </div>
        </div>
      </div>

      {/* CRT 글레어 효과 */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-full'>
        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent' />
      </div>
    </div>
  );
};

export default RetroLoading;
