// import { useGetProblem } from '@/apis/check';

const TodaysProblem = () => {
  // const { data } = useGetProblem();
  // const { problemId } = data;

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='space-y-5 text-center text-white'>
          <div className='text-2xl'>솔브냥이 추천하는 오늘의 문제</div>
          <p>17136</p>
          {/* <p>{problemId}</p> */}
          <div className='flex flex-col space-y-4'>
            <button className='font-medium text-blue-500 transition-colors hover:text-blue-400'>
              문제풀기
            </button>

            <button className='font-medium text-blue-500 transition-colors hover:text-blue-400'>
              냥코인 받기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TodaysProblem;
