import { Clock } from 'lucide-react';

import { Image, useVoteImage } from '@/apis/contest';

import { VotingAvatar } from './VotingAvatar';

interface ContestVotingProps {
  images: Image[];
}

const ContestVoting = ({ images }: ContestVotingProps) => {
  const voteImage = useVoteImage();

  const handleVoteClick = (imageId: number) => {
    voteImage(imageId);
  };

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <div className='relative flex-1'>
        <div className='flex justify-center gap-4 py-10'>
          {images.map(image => (
            <VotingAvatar
              key={image.imageId}
              id={image.imageId}
              imageUrl={image.presignedUrl}
              title={image.username}
              onVote={handleVoteClick}
            />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <div className='flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 shadow-sm backdrop-blur-sm'>
            <Clock className='h-5 w-5 text-gray-300' />
            <p className='text-gray-300'>
              투표 완료 후{' '}
              <span className='inline-flex items-center font-medium text-blue-500'>
                실시간 투표 현황
              </span>
              을 확인하실 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestVoting;
