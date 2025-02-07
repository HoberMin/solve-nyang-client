import { useState } from 'react';

import { useAuctionAvatar } from '@/apis/auction';
import { UserAvatar, useGetUserAvatar } from '@/apis/user';
import { Button } from '@/components/ui/button';
import { RARITY_CONFIG, RARITY_ORDER } from '@/constant/rarityconfig';
import { FullRarity, RarityFilterType } from '@/lib/type';
import { cn, getCatKorName } from '@/lib/utils';

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
        <Button
          onClick={() => setSelectedRarity('ALL')}
          className={cn(
            'border-2',
            selectedRarity === 'ALL'
              ? 'bg-gray-700 text-white'
              : 'border-gray-600 bg-transparent text-gray-400',
          )}
        >
          전체 ({avatars.length})
        </Button>
        {RARITY_ORDER.map(rarity => (
          <Button
            key={rarity}
            onClick={() => setSelectedRarity(rarity)}
            className={cn(
              'border-2',
              selectedRarity === rarity
                ? `${RARITY_CONFIG[rarity].bg} text-white`
                : `${RARITY_CONFIG[rarity].bg} bg-opacity-20 ${RARITY_CONFIG[rarity].text}`,
            )}
          >
            {rarity}등급 ({rarityCounts[rarity] || 0})
          </Button>
        ))}
      </div>

      <div className='grid grid-cols-8 gap-4'>
        {filteredAvatars.map(avatar => {
          const rarity = RARITY_CONFIG[avatar.rarity];

          return (
            <div
              key={avatar.ownedAvatarId}
              className={cn(
                'cursor-pointer rounded-lg border-2 bg-gray-800 p-4 transition-all hover:scale-105',
                rarity.border,
              )}
              onClick={() => setSelectedAvatar(avatar)}
            >
              <div className='relative'>
                <div className={'absolute left-0 top-0 px-2'}>
                  <span className={cn('text-lg font-bold', rarity.text)}>
                    {avatar.rarity}
                  </span>
                </div>
                <img
                  src={`/cats/${avatar.name}.svg`}
                  alt={avatar.name}
                  className='h-28 w-full rounded-md object-cover'
                />
              </div>
              <div className='mt-2 space-y-1'>
                <h3 className='text-center text-sm font-bold text-gray-200'>
                  {getCatKorName(avatar.name)}
                </h3>
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
