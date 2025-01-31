import { useState } from 'react';

import {
  UserAvatar,
  useGetUserAvatar,
  useGetUserInfo,
  useSaleAvatar,
} from '@/apis/user';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

import { getCatKorName } from '../gacha/constants/catMappings';
import FloatingSection from './components/FloatingSection';
import HeaderSection, {
  POINT_PER_AVATAR,
  rarityConfig,
  rarityOrder,
} from './components/HeaderSection';
import { Rarity } from './type';

export const AvatarSalePage = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<UserAvatar[]>([]);
  const [, setIsDialogOpen] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<'ALL' | Rarity>('ALL');

  const { data } = useGetUserAvatar();
  const { data: userInfo } = useGetUserInfo();
  const { point } = userInfo ?? { point: 0 };
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

  const rarityCounts = rarityOrder.reduce<Record<Rarity, number>>(
    (counts, rarity) => {
      counts[rarity] = (data?.avatars ?? []).filter(
        char => char.rarity === rarity,
      ).length;
      return counts;
    },
    {} as Record<Rarity, number>,
  );

  const filteredAvatars = (data?.avatars ?? []).filter(avatar =>
    selectedRarity === 'ALL' ? true : avatar.rarity === selectedRarity,
  );

  return (
    <Layout>
      <div className='relative mx-auto flex h-full w-full max-w-7xl flex-col'>
        <HeaderSection
          point={point}
          totalPoints={totalPoints}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          rarityCounts={rarityCounts}
        />

        <div className='flex-1 overflow-y-auto px-1 pb-32 pt-16'>
          <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
            {filteredAvatars.map(avatar => {
              const isSelected = selectedAvatars.some(
                item => item.ownedAvatarId === avatar.ownedAvatarId,
              );
              const rarity = rarityConfig[avatar.rarity];

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
