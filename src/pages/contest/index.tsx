import { useState } from 'react';

import { useGetImgUrl } from '@/apis/contest';
import Layout from '@/components/Layout';

import ContestVoting from './components/ContestVoting';
import ContestVotingResult from './components/ContestVotingResult';

const ContestPage = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const { data } = useGetImgUrl();
  const { images } = data;

  const handleVote = () => {
    setHasVoted(true);
  };

  console.log(data);

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='m-10 text-center'>
          <h2 className='font-bold text-white'>공모전 아바타 투표</h2>
          <p className='mt-2 text-blue-200/80'>
            공모전을 통해 선정된 TOP 3 중 가장 마음에 드는 아바타에
            투표해주세요! <br />
            1위를 한 아바타는 솔브냥의 다음 업데이트에서 출시됩니다.
          </p>
          <p className='mt-2 text-sm text-blue-200/60'>
            * 투표는 하루에 한 번만 가능합니다.
          </p>

          <div>
            {hasVoted ? (
              <ContestVotingResult images={images} />
            ) : (
              <ContestVoting images={images} handleVote={handleVote} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContestPage;
