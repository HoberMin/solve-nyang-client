import machineImageUrl from '../assets/gacha-machine.svg';

const GachaPage = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Main Content */}
      <main className='container mx-auto mt-8 flex justify-center px-4'>
        <div className='flex w-[700px] flex-col items-center'>
          {/* Gacha Machine Container */}
          <div className='relative'>
            <img src={machineImageUrl} alt='Gacha Machine' className='w-full' />

            {/* Point Display */}
            <div className='absolute bottom-[20%] left-1/2 -translate-x-1/2 transform rounded bg-yellow-300 px-4 py-1 text-center'>
              보유 포인트
              <div className='font-bold'>70,300</div>
            </div>
          </div>

          {/* Buttons */}
          <div className='mt-4 flex gap-4'>
            <button className='rounded bg-red-500 px-8 py-2 text-white'>
              <div>1회 뽑기</div>
              <div className='text-sm'>0코인</div>
            </button>
            <button className='rounded bg-gray-300 px-8 py-2 text-black'>
              <div>10회 뽑기</div>
              <div className='text-sm'>0코인</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GachaPage;
