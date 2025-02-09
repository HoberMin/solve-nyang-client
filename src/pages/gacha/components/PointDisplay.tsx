import { useGetUserPoint } from '@/apis/user';

import coinImg from '/assets/coin.svg';

const PointDisplay = () => {
  const { data } = useGetUserPoint();

  const { point } = data;

  return (
    <div className='w-48 rounded-lg bg-white/10 px-6 py-4 shadow-md backdrop-blur-sm'>
      <div className='mb-2 text-center text-lg font-bold text-white'>
        내 냥코인
      </div>
      <hr className='mb-4' />
      <div className='flex justify-center gap-2 text-base text-white'>
        <img src={coinImg} alt='coin' className='w-6' />
        <p>{point.toLocaleString()}냥</p>
      </div>
    </div>
  );
};

export default PointDisplay;
