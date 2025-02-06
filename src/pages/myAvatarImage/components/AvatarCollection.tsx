import { useState } from 'react';

import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { useResetAvatar } from '@/apis/avatar';
import { UserAvatar, useGetUserAvatar } from '@/apis/user';
import { RARITY_ORDER } from '@/constant/rarityconfig';
import { FullRarity, RarityFilterType } from '@/lib/type';

import { AvatarCard } from './AvatarCard';
import { RarityFilter } from './RarityFilter';
import ResetDialog from './ResetDialog';

const MAX_VISIBLE_AVATARS = 15;

interface AvatarCollectionProps {
  onToggle: (id: string) => void;
}

export const AvatarCollection = ({ onToggle }: AvatarCollectionProps) => {
  const [visibleFilter, setVisibleFilter] = useState<RarityFilterType>('ALL');
  const [hiddenFilter, setHiddenFilter] = useState<RarityFilterType>('ALL');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: resetAvatar } = useResetAvatar();
  const { data: avatarData } = useGetUserAvatar();
  const avatars = avatarData.avatars;

  const visibleAvatars = avatars.filter(avatar => avatar.visible);
  const hiddenAvatars = avatars.filter(avatar => !avatar.visible);

  const getCountsByRarity = (avatars: UserAvatar[]) => {
    return RARITY_ORDER.reduce(
      (acc, rarity) => {
        acc[rarity] = avatars.filter(a => a.rarity === rarity).length;
        return acc;
      },
      {} as Record<FullRarity, number>,
    );
  };

  const visibleCounts = getCountsByRarity(visibleAvatars);
  const hiddenCounts = getCountsByRarity(hiddenAvatars);

  const filterAvatars = (avatars: UserAvatar[], filter: RarityFilterType) =>
    avatars
      .filter(avatar => filter === 'ALL' || avatar.rarity === filter)
      .sort(
        (a, b) =>
          RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity),
      );

  const handleReset = () => {
    resetAvatar();
    setIsDialogOpen(false);
  };

  const handleToggle = (id: string) => {
    const avatar = avatars.find(a => a.ownedAvatarId === id);
    if (!avatar) return;

    if (!avatar.visible && visibleAvatars.length >= MAX_VISIBLE_AVATARS) {
      toast.error(
        <>
          최대 15마리까지만 활성화할 수 있어요.
          <br />
          다른 고양이를 비활성화한 후 다시 시도해주세요!
        </>,
        {
          position: 'top-center',
          duration: 3000,
        },
      );
      return;
    }

    onToggle(id);
  };

  return (
    <div className='mx-auto w-full max-w-5xl space-y-8'>
      <section className='space-y-4'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 text-emerald-400'>
              <span className='text-lg font-bold'>활성화된 고양이</span>
              <span className='text-sm text-white/60'>
                ({visibleAvatars.length}/15)
              </span>
            </div>
            <RotateCcw
              className='h-6 w-6 text-red-500 transition-all'
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
          <div className='mx-4 h-px flex-1 bg-emerald-400/20' />
          <RarityFilter
            selectedRarity={visibleFilter}
            onRarityChange={setVisibleFilter}
            counts={visibleCounts}
          />
        </div>

        <div className='px-2'>
          <div className='grid grid-cols-8 gap-3'>
            {filterAvatars(visibleAvatars, visibleFilter).map(avatar => (
              <AvatarCard
                key={avatar.ownedAvatarId}
                avatar={avatar}
                onClick={() => handleToggle(avatar.ownedAvatarId)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='space-y-4'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 text-gray-400'>
              <span className='text-lg font-bold'>비활성화된 고양이</span>
            </div>
            <span className='text-sm text-white/60'>
              ({hiddenAvatars.length})
            </span>
          </div>
          <div className='mx-4 h-px flex-1 bg-gray-400/20' />
          <RarityFilter
            selectedRarity={hiddenFilter}
            onRarityChange={setHiddenFilter}
            counts={hiddenCounts}
          />
        </div>

        <div className='px-2'>
          <div className='grid grid-cols-8 gap-3'>
            {filterAvatars(hiddenAvatars, hiddenFilter).map(avatar => (
              <AvatarCard
                key={avatar.ownedAvatarId}
                avatar={avatar}
                onClick={() => handleToggle(avatar.ownedAvatarId)}
              />
            ))}
          </div>
        </div>
      </section>

      <ResetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onReset={handleReset}
      />
    </div>
  );
};

export default AvatarCollection;
