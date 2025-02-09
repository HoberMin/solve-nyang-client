import React from 'react';

import { ContestVotingResultProps } from '..';
import SimpleBarChart from './SimpleBarChart';

const ContestVotingResult: React.FC<ContestVotingResultProps> = ({ data }) => {
  const winner = data.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current,
  );

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <div className='relative flex-1'>
        <div className='mb-8'>
          <SimpleBarChart data={data} />
        </div>
        <div className='-mt-24 flex justify-center gap-4'>
          {data.map(avatar => {
            const isWinner = avatar.id === winner.id;

            return (
              <div
                key={avatar.id}
                className='relative flex flex-col items-center'
              >
                {isWinner && (
                  <div className='absolute -top-4 z-20 -translate-x-1/2 animate-bounce text-4xl'>
                    <div className='text-nowrap text-sm font-bold text-amber-400'>
                      현재 1위!
                    </div>
                    👑
                  </div>
                )}
                <img
                  src={avatar.imageUrl}
                  className={`z-10 h-36 w-36 transition-transform ${
                    isWinner ? 'scale-110' : ''
                  }`}
                  alt={avatar.title}
                />
                <span className={'mt-2 text-lg font-bold text-white'}>
                  {avatar.title}
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
