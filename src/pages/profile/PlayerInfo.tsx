import { useEffect } from 'react';

import { BookOpen, Flame, Star, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserInfo } from '@/apis/user';

// const getTierInfo = (tier: number) => {
//   const tiers = [
//     { name: '브론즈', color: 'text-[#CD7F32]', range: [1, 5] },
//     { name: '실버', color: 'text-gray-300', range: [6, 10] },
//     { name: '골드', color: 'text-yellow-500', range: [11, 15] },
//     { name: '플래티넘', color: 'text-blue-300', range: [16, 20] },
//     { name: '다이아몬드', color: 'text-cyan-400', range: [21, 25] },
//     { name: '루비', color: 'text-red-500', range: [26, 30] },
//   ];

//   return tiers.find(t => tier >= t.range[0] && tier <= t.range[1]) || tiers[0];
// };

const getTierInfo = () => {
  return {
    name: '서비스 준비중',
    color: 'text-gray-400',
    range: [0, 0],
  };
};

export const PlayerInfo = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetUserInfo();

  useEffect(() => {
    if (!isPending && !data?.username) {
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

  if (!data?.username) {
    return null;
  }

  const { username, point } = data;
  const tierInfo = getTierInfo();
  const solvedCount = '서비스 준비중';
  const solvedacStrick = '서비스 준비중';

  return (
    <div className='mx-auto w-full max-w-3xl rounded-2xl border border-gray-700/50 bg-gray-900/50 p-4 backdrop-blur-sm'>
      <div className='mb-4 space-y-1 text-center'>
        <div className='font-pixel text-base text-blue-400 sm:text-lg'>
          플레이어 프로필
        </div>
        <p className='flex items-center justify-center gap-1 text-lg font-bold text-blue-200 sm:text-xl'>
          <Target className='h-4 w-4 text-blue-400' />
          {username}
        </p>
      </div>

      <div className='grid gap-2'>
        <div className='rounded-xl bg-gray-800/80 p-2.5 py-4 transition-all hover:bg-gray-800/90'>
          <div className='flex items-center gap-2'>
            <Trophy className='h-4 w-4 text-yellow-400' />
            <div className='flex-1'>
              <p className='text-gray-300'>냥코인</p>
              <p className='text-sm font-bold text-yellow-300'>{point}</p>
            </div>
          </div>
        </div>

        <div className='rounded-xl bg-gray-800/80 p-2.5 py-4 transition-all hover:bg-gray-800/90'>
          <div className='flex items-center gap-2'>
            <Star className={`h-4 w-4 ${tierInfo.color}`} />
            <div className='flex-1'>
              <p className='text-gray-300'>티어</p>
              <p className={`text-sm font-bold ${tierInfo.color}`}>
                {tierInfo.name}
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-xl bg-gray-800/80 p-2.5 py-4 transition-all hover:bg-gray-800/90'>
          <div className='flex items-center gap-2'>
            <BookOpen className='h-4 w-4 text-green-400' />
            <div className='flex-1'>
              <p className='text-gray-300'>해결한 문제</p>
              <p className='text-sm font-bold text-green-300'>{solvedCount}</p>
            </div>
          </div>
        </div>

        <div className='rounded-xl bg-gray-800/80 p-2.5 py-4 transition-all hover:bg-gray-800/90'>
          <div className='flex items-center gap-2'>
            <Flame className='h-4 w-4 text-red-400' />
            <div className='flex-1'>
              <p className='text-gray-300'>최대 스트릭</p>
              <p className='text-sm font-bold text-red-300'>{solvedacStrick}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
