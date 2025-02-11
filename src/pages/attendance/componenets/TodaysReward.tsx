const CheckSolvedProblem = () => {
  return (
    <>
      <div className='flex h-full items-center justify-center'>
        <div className='space-y-5 text-center text-white'>
          <div className='text-2xl font-medium'>문제를 풀어주세요😢</div>
          {/* <div className='text-2xl'>{message}</div> */}
          <div className='flex flex-col space-y-6'>
            <a
              href='https://www.acmicpc.net/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='w-full font-medium text-blue-500 transition-colors hover:text-blue-400'>
                문제 풀러 가기
              </button>
            </a>
            <button className='w-full font-medium text-blue-500 transition-colors hover:text-blue-400'>
              냥코인 받기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckSolvedProblem;
