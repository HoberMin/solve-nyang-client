import { useState } from 'react';

import Layout from '@/components/Layout';

import ContestVoting from './components/ContestVoting';
import ContestVotingResult from './components/ContestVotingResult';

// 기본 아바타 데이터 타입
export interface Avatar {
  id: number;
  title: string;
  imageUrl: string;
  votes: number;
}

// ContestVotingResult 컴포넌트의 props 타입
export interface ContestVotingResultProps {
  data: Avatar[];
}

// ContestVoting 컴포넌트의 props 타입 (참고용)
export interface ContestVotingProps {
  data: Avatar[];
  onVote: (avatarId: number) => void;
}

const avatarData: Avatar[] = [
  {
    id: 1,
    title: '떡국냥',
    imageUrl: 'cats/TteokgukCat.svg',
    votes: 150,
  },
  {
    id: 2,
    title: '까치냥',
    imageUrl: 'cats/MagpieCat.svg',
    votes: 120,
  },
  {
    id: 3,
    title: '새해복냥',
    imageUrl: 'cats/NewYearLuckCat.svg',
    votes: 180,
  },
];

const ContestPage = () => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    setHasVoted(true);
  };

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='m-6 text-center'>
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
              <ContestVotingResult data={avatarData} />
            ) : (
              <ContestVoting data={avatarData} onVote={handleVote} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContestPage;
