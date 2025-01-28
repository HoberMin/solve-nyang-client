import { AlertCircle, Settings } from 'lucide-react';

import Layout from './Layout';

const MaintenancePage = () => {
  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center p-4'>
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
        <div className='relative flex flex-col items-center gap-12'>
          {/* 아이콘 */}
          <div className='flex items-center gap-6'>
            <Settings className='animate-spin-slow h-16 w-16 text-blue-400' />
            <AlertCircle className='h-16 w-16 animate-pulse text-blue-400' />
          </div>

          {/* 메인 텍스트 */}
          <div className='flex flex-col items-center gap-6 text-center'>
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
              1월 31일 정상화 예정
            </p>
          </div>

          {/* 추가 메시지 */}
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

        {/* CRT 스캔라인 효과 */}
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
