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
      votes: voteCount?.count || 0,
    };
  });

  const winner = chartData.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current,
  );

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <div className='relative flex-1'>
        <div className='mb-8'>
          <SimpleBarChart data={chartData} />
        </div>
        <div className='-mt-24 flex justify-center gap-4'>
          {chartData.map(image => {
            const isWinner = image.id === winner.id;

            return (
              <div
                key={image.id}
                className='relative flex flex-col items-center'
              >
                {isWinner && (
                  <div className='absolute -top-4 z-20 -translate-x-1/2 animate-bounce text-4xl'>
                    <div className='text-nowrap text-sm font-bold text-gray-800'>
                      현재 1위!
                    </div>
                    👑
                  </div>
                )}
                <img
                  src={image.imageUrl}
                  className={`z-10 h-36 w-36 transition-transform ${
                    isWinner ? 'scale-110' : ''
                  }`}
                  alt={image.username}
                />
                <span className={'mt-2 text-lg font-bold text-white'}>
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
