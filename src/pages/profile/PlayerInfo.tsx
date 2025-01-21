import { useEffect } from 'react';

import { BookOpen, Flame, Star, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserInfo } from '@/apis/user';
import RetroLoading from '@/components/RetroLoading';

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
  const navigate = useNavigate();
  const { data, isPending } = useGetUserInfo();

  useEffect(() => {
    if (!isPending && !data?.nickname) {
      toast.error('로그인이 필요한 서비스입니다.', {
        description: '로그인 페이지로 이동합니다.',
        action: {
          label: '확인',
          onClick: () => navigate('/login'),
        },
      });
      navigate('/login');
    }
  }, [data, isPending, navigate]);

  if (isPending) {
    return <RetroLoading />;
  }

  if (!data?.nickname) {
    return null;
  }

  const { nickname, point, solvedacTier, solvedCount, solvedacStrick } = data;
  const tierInfo = getTierInfo(solvedacTier);

  return (
    <div className='rounded-2xl border border-gray-700 p-8 shadow-lg'>
      <h2 className='font-pixel mb-6 text-center uppercase tracking-wide text-blue-400 sm:text-3xl'>
        Player Profile
      </h2>

      <div className='mb-8 flex items-center justify-center'>
        <p className='flex items-center gap-3 text-3xl font-extrabold text-blue-200 sm:text-4xl'>
          <Target className='h-6 w-6 text-blue-400 sm:h-8 sm:w-8' />
          {nickname}
        </p>
      </div>

      <div className='flex flex-col items-center gap-6'>
        <div className='flex w-full items-center gap-4 rounded-lg bg-gray-800 p-4 shadow'>
          <Star className={`h-8 w-8 ${tierInfo.color}`} />
          <div>
            <p className='text-base font-medium text-gray-100 sm:text-lg'>
              Tier
            </p>
            <p className={`text-lg font-bold sm:text-xl ${tierInfo.color}`}>
              {tierInfo.name}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-4 rounded-lg bg-gray-800 p-4 shadow'>
          <Trophy className='h-8 w-8 text-yellow-400' />
          <div>
            <p className='text-base font-medium text-gray-100 sm:text-lg'>
              Points
            </p>
            <p className='text-lg font-bold text-yellow-300 sm:text-xl'>
              {point}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-4 rounded-lg bg-gray-800 p-4 shadow'>
          <BookOpen className='h-8 w-8 text-green-400' />
          <div>
            <p className='text-base font-medium text-gray-100 sm:text-lg'>
              Solved Problems
            </p>
            <p className='text-lg font-bold text-green-300 sm:text-xl'>
              {solvedCount}
            </p>
          </div>
        </div>

        <div className='flex w-full items-center gap-4 rounded-lg bg-gray-800 p-4 shadow'>
          <Flame className='h-8 w-8 text-red-400' />
          <div>
            <p className='text-base font-medium text-gray-100 sm:text-lg'>
              Current Streak
            </p>
            <p className='text-lg font-bold text-red-300 sm:text-xl'>
              {solvedacStrick} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
