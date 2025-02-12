import { useGetVoteResult } from '@/apis/contest';
import { Image } from '@/apis/contest';

import SimpleBarChart from './SimpleBarChart';

interface ContestVotingResultProps {
  images: Image[];
}

interface ChartData {
  id: number;
  imageUrl: string;
  username: string;
  votes: number;
}

const ContestVotingResult = ({ images }: ContestVotingResultProps) => {
  const { data } = useGetVoteResult();
  const { voteCounts } = data;

  const chartData: ChartData[] = images.map(image => {
    const voteCount = voteCounts.find(vc => vc.imageId === image.imageId);

    return {
      id: image.imageId,
      imageUrl: image.presignedUrl,
      username: image.username,
      votes: voteCount?.count ?? 0,
    };
  });

  const maxVotes = Math.max(...chartData.map(data => data.votes));

  const winners = chartData.filter(data => data.votes === maxVotes);

  return (
    <div className='container mx-auto flex flex-col'>
      <div className='relative flex-1'>
        <div className='mb-8'>
          <SimpleBarChart data={chartData} />
        </div>
        <div className='-mt-16 flex justify-center gap-4'>
          {chartData.map(image => {
            const isWinner = winners.some(winner => winner.id === image.id);

            return (
              <div
                key={image.id}
                className='relative flex flex-col items-center'
              >
                {isWinner && (
                  <div className='absolute -top-14 z-20 -translate-x-1/2 animate-bounce'>
                    <div className='text-nowrap text-base font-bold text-amber-500'>
                      현재 1위!
                    </div>
                    <div className='text-5xl'>👑</div>
                  </div>
                )}
                <img
                  src={image.imageUrl}
                  className={`z-10 h-32 w-32 transition-transform ${
                    isWinner ? 'scale-110' : ''
                  }`}
                  alt={image.username}
                />
                <span className='mt-2 text-lg font-bold text-white'>
                  {image.username}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContestVotingResult;
