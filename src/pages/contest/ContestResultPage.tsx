import Layout from '@/components/Layout';

const ContestResultPage = () => {
  const winnerData = {
    name: '칠냥',
    imageUrl: '/cats/ChillCat.svg',
    votes: 113,
    totalVotes: 190,
    rank: 'S',
  };

  const calculatePercentage = (votes: number, total: number) => {
    return ((votes / total) * 100).toFixed(1);
  };

  return (
    <Layout>
      <div className='flex flex-col items-center py-8'>
        <div className='w-full max-w-2xl px-4'>
          <h2 className='text-center text-3xl font-bold text-white'>
            🎉 공모전 아바타 투표 결과 🎉
          </h2>
          <p className='mt-4 text-center text-white/60'>
            여러분의 소중한 투표로 새로운 솔브냥 아바타가 선정되었습니다!
          </p>

          <div className='mt-8'>
            <div className='rounded-2xl bg-white/5 p-6'>
              <div className='flex flex-col items-center text-center'>
                <div className='relative'>
                  <img
                    src={winnerData.imageUrl}
                    alt={winnerData.name}
                    className='h-40 w-40 rounded-full'
                  />
                </div>

                <div className='mt-6'>
                  <div className='flex flex-col items-center gap-2'>
                    <h3 className='text-2xl font-bold text-white'>
                      {winnerData.name}
                    </h3>
                    <div className='text-sm font-bold text-[#f74600]'>
                      S등급
                    </div>
                  </div>

                  <div className='mt-4 space-y-1 text-sm text-white/60'>
                    <p>총 투표수: {winnerData.totalVotes.toLocaleString()}표</p>
                    <p>
                      득표율:{' '}
                      {calculatePercentage(
                        winnerData.votes,
                        winnerData.totalVotes,
                      )}
                      %
                      <span className='ml-1 text-sm opacity-80'>
                        ({winnerData.votes.toLocaleString()}표)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 rounded-xl bg-white/5 p-4'>
              <h4 className='text-center font-medium text-white'>안내사항</h4>
              <ul className='mt-2 space-y-1 text-sm text-white/60'>
                <li className='text-center'>
                  • 당선된 아바타는 뽑기에서 만나보실 수 있습니다
                </li>
                <li className='text-center'>
                  • 당선작의 저작권은 솔브냥에 귀속됩니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContestResultPage;
