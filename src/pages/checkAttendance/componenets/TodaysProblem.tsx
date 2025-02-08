const TodaysProblem = () => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='space-y-5 text-center text-white'>
          <div className='text-2xl'>오늘의 문제</div>
          <p>17136</p>
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
