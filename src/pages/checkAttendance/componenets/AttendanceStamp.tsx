const AttendanceStamp = () => {
  return (
    <svg viewBox='0 0 100 100' className='h-8 w-8 text-red-500'>
      <circle cx='50' cy='50' r='45' fill='currentColor' opacity='0.2' />
      <path
        d='M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default AttendanceStamp;
