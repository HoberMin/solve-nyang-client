import { Loader2, Sparkles, Terminal } from 'lucide-react';

const RetroLoading = () => {
  return (
    <div className='flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black'>
      <div className='relative rounded-xl bg-black/30 p-10 backdrop-blur-xl backdrop-filter'>
        {/* 글로우 효과 */}
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10' />
        <div className='absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/20' />

        {/* 컨텐츠 */}
        <div className='relative flex flex-col items-center space-y-8'>
          {/* 로딩 스피너 섹션 */}
          <div className='relative'>
            <div className='absolute -inset-1 rounded-full bg-blue-500/20 blur-lg' />
            <div className='relative rounded-full bg-gray-900 p-4'>
              <Loader2 className='h-12 w-12 animate-spin text-blue-500' />
            </div>
          </div>

          {/* 로딩 텍스트 섹션 */}
          <div className='text-center'>
            <h2 className='flex items-center gap-2 text-xl font-bold'>
              <Sparkles className='h-5 w-5 text-blue-400' />
              <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Loading...
              </span>
              <Sparkles className='h-5 w-5 text-purple-400' />
            </h2>
            <p className='mt-2 text-sm text-gray-400'>
              알고리즘의 세계로 여행을 떠나볼까요?
            </p>
          </div>

          {/* 팁 섹션 */}
          <div className='w-80 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 shadow-lg'>
            <div className='flex items-center gap-2'>
              <Terminal className='h-4 w-4 text-blue-400' />
              <span className='text-xs font-medium text-blue-400'>
                오늘의 팁
              </span>
            </div>
            <div className='mt-2 text-center text-sm text-gray-300'>
              백준 문제를 풀어 포인트를 획득하고
              <br />
              특별한 아바타를 수집해보세요!
            </div>
          </div>
        </div>

        {/* 장식용 테두리 */}
        <div className='absolute inset-0 rounded-xl border border-white/10' />
        <div className='absolute inset-0 rounded-xl border border-blue-500/5' />
      </div>
    </div>
  );
};

export default RetroLoading;
