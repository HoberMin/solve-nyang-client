import { Coins, Flame, Target, Trophy } from 'lucide-react';

import { UserInfo } from '@/apis/user';

import { StatItem } from './StatItem';

type UserStatsProps = {
  userInfo: UserInfo;
};

export const UserStats = ({ userInfo }: UserStatsProps) => {
  const statsItems = [
    {
      icon: Trophy,
      label: '티어',
      value: userInfo.tier,
      color: 'text-yellow-400',
    },
    {
      icon: Coins,
      label: '포인트',
      value: userInfo.point,
      color: 'text-yellow-400',
    },
    {
      icon: Target,
      label: '해결한 문제',
      value: userInfo.solvedCount,
      color: 'text-blue-400',
    },
    {
      icon: Flame,
      label: '최대 스트릭',
      value: `${userInfo.streak}일`,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-6'>
      {statsItems.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </div>
  );
};
