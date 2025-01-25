import Layout from './Layout';

const MaintenancePage = () => {
  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center p-4'>
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

        <div className='relative flex flex-col items-center gap-8'>
          <div className='flex flex-col items-center gap-4'>
            <h1
              className='bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-5xl font-bold text-transparent'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
              }}
            >
              서비스 점검중
            </h1>
            <p
              className='text-xl text-blue-400'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
              }}
            >
              서비스 준비중입니다
            </p>
          </div>

          <div className='relative'>
            <svg
              width='120'
              height='100'
              viewBox='0 0 120 100'
              className='text-blue-400'
            >
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
          <div
            className='max-w-md text-center text-lg text-blue-400/80'
            style={{
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            더 나은 서비스 제공을 위해
            <br />
            시스템 점검을 진행중입니다
            <br />
            이용에 불편을 드려 죄송합니다
          </div>
        </div>
        <div
          className='pointer-events-none absolute inset-0 opacity-5'
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

export default MaintenancePage;
