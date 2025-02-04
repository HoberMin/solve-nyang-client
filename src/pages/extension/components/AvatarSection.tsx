import { useState } from 'react';

import { Cat, Puzzle } from 'lucide-react';

import { UserAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';
import { Rarity } from '@/pages/sale/type';

import { AvatarGrid } from './AvatarGrid';
import { RarityFilter } from './RarityFilter';

interface AvatarSectionProps {
  title: string;
  avatars: UserAvatar[];
  isExtension: boolean;
}

export const AvatarSection = ({
  title,
  avatars,
  isExtension,
}: AvatarSectionProps) => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'ALL'>('ALL');

  const filteredAvatars = avatars.filter(
    avatar => selectedRarity === 'ALL' || avatar.rarity === selectedRarity,
  );

  return (
    <div className='mx-auto w-full max-w-5xl space-y-4'>
      <div className={cn('flex items-center justify-between px-4')}>
        <div className='flex items-center space-x-3'>
          <div
            className={cn(
              'flex items-center space-x-2',
              isExtension ? 'text-blue-400' : 'text-purple-400',
            )}
          >
            {isExtension ? (
              <Puzzle className='h-5 w-5' />
            ) : (
              <Cat className='h-5 w-5' />
            )}
            <span className='text-lg font-bold'>{title}</span>
          </div>
          <span className='text-sm text-white/60'>({avatars.length})</span>
        </div>
        <div
          className={cn(
            'mx-4 h-px flex-1',
            isExtension ? 'bg-blue-400/20' : 'bg-purple-400/20',
          )}
        />
        <RarityFilter
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
        />
      </div>

      <div className='px-2'>
        <AvatarGrid avatars={filteredAvatars} />
      </div>
    </div>
  );
};
