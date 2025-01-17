import { useNavigate } from 'react-router-dom';

interface RetroErrorProps {
  error?: Error | null;
}

const RetroError = ({ error }: RetroErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gray-900'>
      {/* 격자 패턴 배경 */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
        }}
      />

      <div className='relative'>
        <div className='flex flex-col items-center gap-8'>
          {/* 에러 아이콘 */}
          <div className='relative'>
            <svg width='80' height='80' viewBox='0 0 80 80'>
              <rect x='35' y='10' width='10' height='10' fill='#EF4444' />
              <rect x='60' y='35' width='10' height='10' fill='#FCA5A5' />
              <rect x='35' y='60' width='10' height='10' fill='#B91C1C' />
              <rect x='10' y='35' width='10' height='10' fill='#DC2626' />
            </svg>
          </div>

          {/* 에러 텍스트 */}
          <div
            className='bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-2xl text-transparent'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
            }}
          >
            ERROR
          </div>

          {/* 에러 메시지 컨테이너 */}
          <div className='relative w-96 overflow-hidden rounded border-2 border-red-500/30 bg-gray-800/50 p-4'>
            <div
              className='text-center text-xs text-red-400'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
              }}
            >
              {error?.message || '알 수 없는 오류가 발생했습니다'}
            </div>
          </div>

          {/* 메인으로 이동 버튼 */}
          <button
            onClick={() => navigate('/')}
            className='border-2 border-red-500 px-6 py-2 transition-colors hover:bg-red-500/10'
            type='button'
          >
            <span
              className='text-sm text-red-400'
              style={{
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              MAIN MENU
            </span>
          </button>

          {/* 팁 메시지 */}
          <div
            className='text-xs text-red-400'
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
            }}
          >
            문제가 지속되면 새로고침을 시도하세요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroError;
