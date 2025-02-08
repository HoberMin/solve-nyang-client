import { useState } from 'react';

import { useAuctionAvatar } from '@/apis/auction';
import { UserAvatar, useGetUserAvatar } from '@/apis/user';
import { RARITY_CONFIG, RARITY_ORDER } from '@/constant/rarityconfig';
import { FullRarity, RarityFilterType } from '@/lib/type';
import { cn, getCatKorName } from '@/lib/utils';

import { RarityFilter } from '../myAvatarImage/components/RarityFilter';
import SaleDialog from './components/SaleDialog';

const AuctionSale = () => {
  const { data } = useGetUserAvatar();
  const auctionAvatar = useAuctionAvatar();
  const [selectedAvatar, setSelectedAvatar] = useState<UserAvatar | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');

  const handleSell = (avatar: UserAvatar, price: number) => {
    auctionAvatar({ id: avatar.ownedAvatarId, price });
  };

  const avatars = data?.avatars || [];

  const filteredAvatars =
    selectedRarity === 'ALL'
      ? avatars
      : avatars.filter(avatar => avatar.rarity === selectedRarity);

  const rarityCounts = RARITY_ORDER.reduce<Record<FullRarity, number>>(
    (counts, rarity) => {
      counts[rarity] = avatars.filter(char => char.rarity === rarity).length;
      return counts;
    },
    {} as Record<FullRarity, number>,
  );

  return (
    <div className='space-y-6'>
      <div className='flex gap-2'>
        <RarityFilter
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
          counts={rarityCounts}
        />
      </div>

      <div className='grid grid-cols-7 gap-4'>
        {filteredAvatars.map(avatar => {
          return (
            <div
              key={avatar.ownedAvatarId}
              className={
                'cursor-pointer rounded-lg bg-gray-800/50 p-2 transition-all hover:scale-105'
              }
              onClick={() => setSelectedAvatar(avatar)}
            >
              <div
                className={cn(
                  'mb-1 text-center text-xs font-bold',
                  RARITY_CONFIG[avatar.rarity].text,
                )}
              >
                {avatar.rarity}
              </div>
              <div className='relative flex aspect-square flex-col items-center justify-center'>
                <img
                  src={`/cats/${avatar.name}.svg`}
                  alt={avatar.name}
                  className='h-24 rounded object-cover'
                />
                <div className='mt-2 space-y-1'>
                  <h3 className='mt-1 truncate whitespace-nowrap text-center text-xs text-white'>
                    {getCatKorName(avatar.name)}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAvatar && (
        <SaleDialog
          avatar={selectedAvatar}
          isOpen={!!selectedAvatar}
          onClose={() => setSelectedAvatar(null)}
          onConfirm={handleSell}
        />
      )}
    </div>
  );
};

export default AuctionSale;
