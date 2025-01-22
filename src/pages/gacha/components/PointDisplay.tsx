import coinImg from '/coin.svg';

interface PointDisplayProps {
  point: number;
}

export const PointDisplay = ({ point }: PointDisplayProps) => {
  return (
    <div className='w-48 rounded-lg bg-white/10 px-6 py-4 shadow-md backdrop-blur-sm'>
      <h2 className='mb-2 text-center text-xl font-bold text-white'>
        내 포인트
      </h2>
      <hr className='mb-4' />
      <div className='flex text-lg text-white'>
        <img src={coinImg} alt='coin' className='w-8' />
        {point.toLocaleString()}
      </div>
    </div>
  );
};
