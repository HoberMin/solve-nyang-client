import { Trophy } from 'lucide-react';

import { useGetVoteResult } from '@/apis/contest';
import { Image } from '@/apis/contest';

interface ContestVotingResultProps {
  images: Image[];
}

interface RankingData {
  id: number;
  imageUrl: string;
  username: string;
  votes: number;
  rank: number;
  percentage: number;
}

const ContestVotingResult = ({ images }: ContestVotingResultProps) => {
  const { data } = useGetVoteResult();
  const { voteCounts } = data;

  const totalVotes = voteCounts.reduce((sum, vc) => sum + (vc.count ?? 0), 0);

  const rankingData: RankingData[] = images
    .map(image => {
      const voteCount = voteCounts.find(vc => vc.imageId === image.imageId);
      const votes = voteCount?.count ?? 0;

      return {
        id: image.imageId,
        imageUrl: image.presignedUrl,
        username: image.username,
        votes,
        rank: 0,
        percentage: totalVotes > 0 ? (votes / totalVotes) * 100 : 0,
      };
    })
    .sort((a, b) => b.votes - a.votes);

  let currentRank = 1;
  let previousVotes = rankingData[0]?.votes;

  rankingData.forEach((data, index) => {
    if (data.votes < previousVotes) {
      currentRank = index + 1;
    }
    data.rank = currentRank;
    previousVotes = data.votes;
  });

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className='flex items-center gap-2'>
            <Trophy className='h-8 w-8 text-amber-400' fill='currentColor' />
            <span className='text-amber-400'>1위</span>
          </div>
        );
      case 2:
        return (
          <div className='flex items-center gap-2'>
            <Trophy className='h-8 w-8 text-slate-300' fill='currentColor' />
            <span className='text-slate-300'>2위</span>
          </div>
        );
      case 3:
        return (
          <div className='flex items-center gap-2'>
            <Trophy className='h-8 w-8 text-amber-700' fill='currentColor' />
            <span className='text-amber-700'>3위</span>
          </div>
        );
      default:
        return (
          <span className='text-2xl font-bold text-white/90'>{rank}th</span>
        );
    }
  };

  const getCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-amber-400/10';
      case 2:
        return 'bg-slate-300/10';
      case 3:
        return 'bg-amber-700/10';
      default:
        return 'bg-white/10';
    }
  };

  return (
    <div className='p-0'>
      <div className='flex flex-col items-center gap-4'>
        {rankingData.map(contestant => (
          <div
            key={contestant.id}
            className={`flex w-full items-center gap-32 rounded-xl px-10 ${getCardStyle(
              contestant.rank,
            )} p-4 backdrop-blur-sm transition-all`}
          >
            <div className='flex items-center gap-6'>
              <div className='flex h-12 items-center justify-center'>
                {getRankDisplay(contestant.rank)}
              </div>

              <div className='relative'>
                <img
                  src={contestant.imageUrl}
                  alt={contestant.username}
                  className={`h-24 w-24 rounded-lg transition-transform duration-300 ${
                    contestant.rank === 1 ? 'scale-110' : ''
                  }`}
                />
              </div>
            </div>

            <div className='flex flex-1 flex-col'>
              <span className='text-lg font-bold text-white'>
                {contestant.username}
              </span>
              <div className='flex items-baseline gap-2 text-blue-200/80'>
                <span>{contestant.percentage.toFixed(1)}%</span>
                <span className='text-sm text-blue-200/60'>
                  ({contestant.votes.toLocaleString()} 표)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestVotingResult;
