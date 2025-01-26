import { Terminal } from 'lucide-react';

const RetroLoading = () => {
  return (
    <div className='bg-navy-900 flex h-[100vh] w-full items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-950'>
      <div className='relative rounded-xl bg-slate-950/80 p-12 backdrop-blur-lg backdrop-filter'>
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-blue-500/5' />
        <div className='absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10' />
        <div className='relative flex flex-col items-center space-y-12'>
          <div className='relative'>
            <div className='absolute -inset-1 rounded-full bg-indigo-500/10' />
            <div className='relative rounded-full bg-slate-900 p-6'>
              <div className='h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500'></div>
            </div>
          </div>
          <div className='text-center'>
            <h2 className='flex items-center gap-4 text-2xl font-bold tracking-wider'>
              <span className='bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
                Loading...
              </span>
            </h2>
            <p className='mt-4 text-base text-slate-400'>
              알고리즘의 세계로 여행을 떠나볼까요?
            </p>
          </div>
          <div className='w-96 rounded-lg border border-indigo-500/10 bg-indigo-500/5 p-6 shadow-lg'>
            <div className='flex items-center gap-3'>
              <Terminal className='h-5 w-5 text-indigo-400' />
              <span className='text-sm font-medium text-indigo-400'>
                오늘의 팁
              </span>
            </div>
            <div className='mt-4 text-center text-base leading-relaxed text-slate-300'>
              백준 문제를 풀어 냥코인을 획득하고
              <br />
              특별한 아바타를 수집해보세요!
            </div>
          </div>
        </div>
        <div className='absolute inset-0 rounded-xl border border-white/5' />
        <div className='absolute inset-0 rounded-xl border border-indigo-500/5' />
      </div>
    </div>
  );
};

export default RetroLoading;
