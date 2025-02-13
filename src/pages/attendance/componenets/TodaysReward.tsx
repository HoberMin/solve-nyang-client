import { useCheckSolvedProblem, useGetMessage } from '@/apis/attendance';

import { useThrottle } from '../hooks/useThrottle';

const CheckSolvedProblem = () => {
  const { data: messageData } = useGetMessage();
  const { mutateAsync: checkSolved, isPending } = useCheckSolvedProblem();

  const handleRewardClick = useThrottle(async () => {
    await checkSolved();
  }, 3000);

  return (
    <>
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center space-y-5 text-center text-white'>
          <div className='text-2xl text-white'>
            {messageData?.message || '시작이 반이다!'}
          </div>

          <div className='flex'>
            <a
              href='https://www.acmicpc.net/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='font-medium text-blue-500 transition-colors hover:text-blue-400'>
                문제 풀러 가기
              </button>
            </a>
            <button
              onClick={handleRewardClick}
              disabled={isPending}
              className='font-medium text-blue-500 transition-colors hover:text-blue-400'
            >
              {isPending ? '확인 중...' : '냥코인 받기'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckSolvedProblem;
