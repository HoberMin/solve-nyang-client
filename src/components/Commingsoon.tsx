import Layout from './Layout';

const ComingSoon = () => {
  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center bg-gray-900 p-4'>
        {/* 격자 패턴 배경 */}
        <div
          className='absolute inset-0 opacity-5'
          style={{
            backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
            backgroundSize: '8px 8px',
          }}
        />

        {/* 메인 콘텐츠 */}
        <div className='relative flex flex-col items-center gap-8'>
          {/* 메인 텍스트 */}
          <div className='flex flex-col items-center gap-4'>
            <h1
              className='bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-4xl text-transparent'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
              }}
            >
              COMING SOON
            </h1>
            <p
              className='mt-2 text-center text-sm text-blue-400'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
              }}
            >
              서비스 준비중입니다
            </p>
          </div>

          {/* 픽셀 아트 스타일 컴퓨터 */}
          <div className='relative'>
            <svg
              width='120'
              height='100'
              viewBox='0 0 120 100'
              className='text-blue-400'
            >
              {/* Monitor */}
              <rect
                x='10'
                y='10'
                width='100'
                height='60'
                fill='currentColor'
                opacity='0.2'
              />
              <rect
                x='15'
                y='15'
                width='90'
                height='50'
                fill='currentColor'
                opacity='0.3'
              />
              {/* Screen Content (Scanlines) */}
              <rect
                x='20'
                y='20'
                width='80'
                height='40'
                fill='currentColor'
                opacity='0.1'
              >
                <animate
                  attributeName='opacity'
                  values='0.1;0.15;0.1'
                  dur='2s'
                  repeatCount='indefinite'
                />
              </rect>
              {/* Stand */}
              <rect
                x='50'
                y='70'
                width='20'
                height='10'
                fill='currentColor'
                opacity='0.2'
              />
              <rect
                x='40'
                y='80'
                width='40'
                height='5'
                fill='currentColor'
                opacity='0.2'
              />
            </svg>
          </div>

          {/* 진행 상태 표시 */}
          <div className='flex flex-col items-center gap-3'>
            <div className='relative h-3 w-64 overflow-hidden rounded border border-blue-400/30 bg-gray-800/30'>
              <div className='animate-progress-infinite h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600' />
            </div>
            <p
              className='animate-pulse text-xs text-blue-400/70'
              style={{
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              LOADING...
            </p>
          </div>

          {/* 추가 메시지 */}
          <div
            className='mt-8 max-w-md text-center text-xs text-blue-400/60'
            style={{
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            더 나은 서비스 제공을 위해 준비중입니다
            <br />
            조금만 기다려주세요!
          </div>
        </div>

        {/* CRT 스캔라인 효과 */}
        <div
          className='animate-scanline opacity-3 pointer-events-none absolute inset-0'
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 2px)',
            backgroundSize: '4px 4px',
          }}
        />
      </div>
    </Layout>
  );
};

export default ComingSoon;
