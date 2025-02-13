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
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center space-y-5 text-center'>
          <div className='rounded-xl bg-gray-700/50 p-8 text-xl font-bold text-white'>
            {messageData?.message || '시작이 반이다!'}
          </div>

          <div className='flex gap-2'>
            <a
              href='https://www.acmicpc.net/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='mt-10 bg-blue-500 font-medium text-gray-100 transition-colors hover:bg-blue-400'>
                문제 풀러 가기
              </button>
            </a>
            <button
              onClick={handleRewardClick}
              disabled={isPending}
              className='mt-10 w-[150px] bg-green-600 font-medium text-gray-100 transition-colors hover:bg-green-500'
            >
              {isPending ? '확인 중...' : '냥코인 받기'}
            </button>
          </div>
          <div className='space-y-1 text-white'>
            <p>* 전에 풀었던 문제를 다시 푸는 경우 냥코인 수령 불가</p>
            <p>* 다른 언어로 다시 풀었을 경우 냥코인 수령 불가</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckSolvedProblem;
