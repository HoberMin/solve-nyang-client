import Layout from '@/components/Layout';

import ContestVotingResult from './components/ContestVotingResult';

const ContestPage = () => {
  return (
    <Layout>
      <div className='flex justify-center font-bold'>
        <div className='m-10 text-center'>
          <h1 className='text-white'>고양이 아바타 공모전</h1>
          <h2 className='text-white'>TOP 3 투표하기</h2>

          <ContestVotingResult />
        </div>
      </div>
    </Layout>
  );
};

export default ContestPage;
