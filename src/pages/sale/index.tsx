import { useState } from 'react';

import { UserAvatar, useGetUserAvatar, useSaleAvatar } from '@/apis/user';
import Layout from '@/components/Layout';
import { RARITY_CONFIG, RARITY_ORDER } from '@/constant/rarityconfig';
import { FullRarity, RarityFilterType } from '@/lib/type';
import { cn, getCatKorName } from '@/lib/utils';

import FloatingSection from './components/FloatingSection';
import HeaderSection, { POINT_PER_AVATAR } from './components/HeaderSection';

export const AvatarSalePage = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<UserAvatar[]>([]);
  const [, setIsDialogOpen] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');

  const { data } = useGetUserAvatar();
  const { mutate: saleAvatars } = useSaleAvatar();

  const totalPoints = selectedAvatars.length * POINT_PER_AVATAR;

  const handleAvatarSelect = (avatar: UserAvatar) => {
    setSelectedAvatars(prev =>
      prev.find(item => item.ownedAvatarId === avatar.ownedAvatarId)
        ? prev.filter(item => item.ownedAvatarId !== avatar.ownedAvatarId)
        : [...prev, avatar],
    );
  };

  const handleSale = () => {
    saleAvatars({ avatars: selectedAvatars });
    setIsDialogOpen(false);
    setSelectedAvatars([]);
  };

  const getDuplicateAvatars = () => {
    const avatarsByName = new Map<string, UserAvatar[]>();

    const avatarsToCheck = (data?.avatars ?? []).filter(avatar =>
      selectedRarity === 'ALL' ? true : avatar.rarity === selectedRarity,
    );

    avatarsToCheck.forEach(avatar => {
      const existing = avatarsByName.get(avatar.name) ?? [];
      avatarsByName.set(avatar.name, [...existing, avatar]);
    });

    return Array.from(avatarsByName.values())
      .filter(avatars => avatars.length > 1)
      .map(avatars => avatars.slice(1))
      .flat();
  };

  const handleSelectDuplicates = () => {
    setSelectedAvatars(getDuplicateAvatars());
  };

  const hasDuplicates = getDuplicateAvatars().length > 0;

  const rarityCounts = RARITY_ORDER.reduce<Record<FullRarity, number>>(
    (counts, rarity) => {
      counts[rarity] = (data?.avatars ?? []).filter(
        char => char.rarity === rarity,
      ).length;
      return counts;
    },
    {} as Record<FullRarity, number>,
  );

  const filteredAvatars = (data?.avatars ?? []).filter(avatar =>
    selectedRarity === 'ALL' ? true : avatar.rarity === selectedRarity,
  );

  return (
    <Layout>
      <div className='relative mx-auto flex h-full w-full max-w-5xl flex-col'>
        <HeaderSection
          totalPoints={totalPoints}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          rarityCounts={rarityCounts}
        />

        <div className='flex-1 overflow-y-auto px-1 pb-32 pt-16'>
          <div className='grid grid-cols-8 gap-3'>
            {filteredAvatars.map(avatar => {
              const isSelected = selectedAvatars.some(
                item => item.ownedAvatarId === avatar.ownedAvatarId,
              );
              const rarity = RARITY_CONFIG[avatar.rarity];

              return (
                <div
                  key={avatar.ownedAvatarId}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={cn(
                    'relative cursor-pointer rounded-lg border-2 p-1.5 transition-all hover:scale-105',
                    rarity.border,
                    isSelected && 'border-4',
                  )}
                >
                  <div className='relative aspect-square overflow-hidden rounded-md'>
                    <img
                      src={`/cats/${avatar.name}.svg`}
                      alt={avatar.name}
                      className='h-full w-full object-cover p-3'
                    />
                    {isSelected && (
                      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/70'>
                        <span className={cn('text-lg font-bold', rarity.text)}>
                          +{POINT_PER_AVATAR}P
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='mt-2 text-center'>
                    <p
                      className={cn(
                        'text-sm',
                        rarity.text,
                        avatar.rarity === 'S' && 'font-bold',
                      )}
                    >
                      {getCatKorName(avatar.name)}
                    </p>
                    <p
                      className={cn(
                        'text-xs',
                        rarity.text,
                        avatar.rarity === 'S' && 'font-bold',
                      )}
                    >
                      {avatar.rarity}등급
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <FloatingSection
          selectedAvatars={selectedAvatars}
          hasDuplicates={hasDuplicates}
          totalPoints={totalPoints}
          onSelectDuplicates={handleSelectDuplicates}
          onReset={() => setSelectedAvatars([])}
          onSale={handleSale}
        />
      </div>
    </Layout>
  );
};

export default AvatarSalePage;
