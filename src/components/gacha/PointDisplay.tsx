interface PointDisplayProps {
  point: number;
}

export const PointDisplay = ({ point }: PointDisplayProps) => {
  return (
    <div className='w-36 rounded-lg bg-white/10 px-6 py-4 shadow-md backdrop-blur-sm'>
      <div className='mb-2 text-center text-lg font-bold text-white'>
        내 포인트
      </div>
      <div className='text-white'>🪙 {point.toLocaleString()}</div>
    </div>
  );
};
