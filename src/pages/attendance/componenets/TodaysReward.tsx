import {
  useCheckSolvedProblem,
  useGetMessage,
  useGetTodayAttendance,
} from '@/apis/attendance';

import { useThrottle } from '../hooks/useThrottle';

const CheckSolvedProblem = () => {
  const { data: messageData } = useGetMessage();
  const { mutateAsync: checkSolved, isPending } = useCheckSolvedProblem();
  const { data: todayAttendance } = useGetTodayAttendance();

  const handleRewardClick = useThrottle(async () => {
    await checkSolved();
  }, 3000);

  const buttonStyle = `mt-10 w-[150px] font-medium text-gray-100 transition-colors ${
    todayAttendance?.isAttended
      ? 'bg-gray-500 cursor-not-allowed' // 이미 출석한 경우 회색
      : 'bg-green-600 hover:bg-green-500' // 출석 가능한 경우 초록색
  }`;

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
              disabled={isPending || todayAttendance?.isAttended}
              className={buttonStyle}
            >
              {isPending
                ? '확인 중...'
                : todayAttendance?.isAttended
                  ? '지급 완료'
                  : '냥코인 받기'}
            </button>
          </div>
          <div className='space-y-2 text-white'>
            <p>* 1일 1회 참여 가능합니다.</p>
            <p>
              * 전에 풀었던 문제를 다시 푸는 경우 <br /> 냥코인을 받을 수
              없습니다.
            </p>
            <p>
              * 같은 문제를 다른 언어로 다시 풀었을 경우 <br /> 냥코인을 받을 수
              없습니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckSolvedProblem;
