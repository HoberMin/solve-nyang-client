import { BookOpen, Flame, Star, Target, Trophy } from 'lucide-react';

import { useGetUserInfo } from '@/apis/user';

const getTierInfo = (tier: number) => {
  const tiers = [
    { name: 'Bronze', color: 'text-[#CD7F32]', range: [1, 5] },
    { name: 'Silver', color: 'text-gray-300', range: [6, 10] },
    { name: 'Gold', color: 'text-yellow-500', range: [11, 15] },
    { name: 'Platinum', color: 'text-blue-300', range: [16, 20] },
    { name: 'Diamond', color: 'text-cyan-400', range: [21, 25] },
    { name: 'Ruby', color: 'text-red-500', range: [26, 30] },
  ];

  return tiers.find(t => tier >= t.range[0] && tier <= t.range[1]) || tiers[0];
};

export const PlayerInfo = () => {
  const { data } = useGetUserInfo();
  const { nickname, point, solvedacTier, solvedCount, solvedacStrick } = data;
  const tierInfo = getTierInfo(solvedacTier);

  return (
    <div className='rounded-2xl border p-6'>
      <h2 className='font-pixel mb-4 text-center text-xl uppercase tracking-widest text-blue-400'>
        Player Profile
      </h2>

      <div className='mb-4 flex items-center justify-center'>
        <p className='flex items-center gap-2 text-2xl font-bold text-blue-200 sm:text-3xl'>
          <Target className='h-5 w-5 text-blue-400 sm:h-6 sm:w-6' />
          {nickname}
        </p>
      </div>

      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex w-full items-center gap-3 rounded-lg p-3'>
          <Star className={`h-6 w-6 ${tierInfo.color}`} />
          <div>
            <p className='text-xs text-gray-400 sm:text-sm'>Tier</p>
            <p className={`text-sm font-bold sm:text-base ${tierInfo.color}`}>
              {tierInfo.name}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-3 rounded-lg p-3'>
          <Trophy className='h-6 w-6 text-yellow-400' />
          <div>
            <p className='text-xs text-gray-400 sm:text-sm'>Points</p>
            <p className='text-sm font-bold text-yellow-300 sm:text-base'>
              {point}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-3 rounded-lg p-3'>
          <BookOpen className='h-6 w-6 text-green-400' />
          <div>
            <p className='text-xs text-gray-400 sm:text-sm'>Solved Problems</p>
            <p className='text-sm font-bold text-green-300 sm:text-base'>
              {solvedCount}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-3 rounded-lg p-3'>
          <Flame className='h-6 w-6 text-red-400' />
          <div>
            <p className='text-xs text-gray-400 sm:text-sm'>Current Streak</p>
            <p className='text-sm font-bold text-red-300 sm:text-base'>
              {solvedacStrick} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
