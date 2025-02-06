import SimpleBarChart from './SimpleBarChart';

const dummyData = [
  {
    name: '까치냥',
    value: 143,
  },
  {
    name: '떡국냥',
    value: 276,
  },
  {
    name: '새해복냥',
    value: 63,
  },
];

const ContestVotingResult = () => {
  return (
    <div className='container mx-auto flex min-h-screen flex-col p-4'>
      <div className='relative flex-1'>
        <div className='mb-8'>
          <SimpleBarChart data={dummyData} />
        </div>
        <div className='-mt-24 flex justify-center gap-4'>
          <img
            src='/cats/SSAFY.svg'
            className='z-10 h-32 w-32 transition-transform hover:scale-110'
            alt='cat1'
          />
          <img
            src='/cats/SSAFY.svg'
            className='z-10 h-32 w-32 transition-transform hover:scale-110'
            alt='cat2'
          />
          <img
            src='/cats/SSAFY.svg'
            className='z-10 h-32 w-32 transition-transform hover:scale-110'
            alt='cat3'
          />
        </div>
      </div>
    </div>
  );
};

export default ContestVotingResult;
