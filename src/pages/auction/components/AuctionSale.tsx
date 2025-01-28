import React, { useState } from 'react';

import { UserAvatar, useGetUserAvatar, useSaleAvatar } from '@/apis/user';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

type Rarity = 'S' | 'A' | 'B' | 'C' | 'D' | 'H';

const rarityConfig: Record<
  Exclude<Rarity, 'H'>,
  {
    border: string;
    text: string;
    bg: string;
  }
> = {
  S: {
    border: 'border-[#f74600]',
    text: 'text-[#f74600]',
    bg: 'bg-[#f74600]',
  },
  A: {
    border: 'border-[#ffc337]',
    text: 'text-[#ffc337]',
    bg: 'bg-[#ffc337]',
  },
  B: {
    border: 'border-[#7abf16]',
    text: 'text-[#7abf16]',
    bg: 'bg-[#7abf16]',
  },
  C: {
    border: 'border-[#108df1]',
    text: 'text-[#108df1]',
    bg: 'bg-[#108df1]',
  },
  D: {
    border: 'border-[#a663ee]',
    text: 'text-[#a663ee]',
    bg: 'bg-[#a663ee]',
  },
};

const defaultRarityStyle = {
  border: 'border-gray-400',
  text: 'text-gray-400',
  bg: 'bg-gray-400',
};

const rarityOrder: Exclude<Rarity, 'H'>[] = ['S', 'A', 'B', 'C', 'D'];

interface SaleDialogProps {
  avatar: UserAvatar;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (avatar: UserAvatar, price: number) => void;
}

const SaleDialog: React.FC<SaleDialogProps> = ({
  avatar,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [price, setPrice] = useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setPrice(value);
    }
  };

  const handleProceed = () => {
    if (price >= 0) {
      setIsConfirmDialogOpen(true);
    }
  };

  const handleConfirm = () => {
    onConfirm(avatar, price);
    setIsConfirmDialogOpen(false);
    onClose();
  };

  const handleClose = () => {
    setIsConfirmDialogOpen(false);
    setPrice(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='border-transparent bg-gray-800 text-gray-200 sm:max-w-md'>
        {!isConfirmDialogOpen ? (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>판매</h3>
            <div className='space-y-3'>
              <div className='space-y-2'>
                <Label htmlFor='price'>판매 가격</Label>
                <Input
                  id='price'
                  type='number'
                  min={0}
                  value={price}
                  onChange={handlePriceChange}
                  className='border-gray-600 bg-gray-700 text-gray-200'
                />
              </div>
            </div>

            <div className='flex justify-end space-x-2'>
              <Button
                onClick={handleProceed}
                disabled={price < 0}
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                다음
              </Button>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <p className='text-sm text-gray-200'>
              <span className='font-bold'>{getCatKorName(avatar.name)}</span>
              을(를) <span className='font-bold'>{price.toLocaleString()}</span>
              냥에 판매하시겠습니까?
            </p>
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                onClick={() => setIsConfirmDialogOpen(false)}
                className='border-gray-600 bg-transparent text-gray-200 hover:bg-gray-700'
              >
                이전
              </Button>
              <Button
                onClick={handleConfirm}
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                판매
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AuctionSale = () => {
  const { data } = useGetUserAvatar();
  const { mutate: saleAvatar } = useSaleAvatar();
  const [selectedAvatar, setSelectedAvatar] = useState<UserAvatar | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<
    'ALL' | Exclude<Rarity, 'H'>
  >('ALL');

  const handleSell = (avatar: UserAvatar) => {
    saleAvatar({
      avatars: [avatar],
    });
  };

  // Hidden 등급을 제외한 아바타만 필터링
  const avatars = (data?.avatars || []).filter(avatar => avatar.rarity !== 'H');

  const filteredAvatars =
    selectedRarity === 'ALL'
      ? avatars
      : avatars.filter(avatar => avatar.rarity === selectedRarity);

  const rarityCounts = rarityOrder.reduce<Record<Exclude<Rarity, 'H'>, number>>(
    (counts, rarity) => {
      counts[rarity] = avatars.filter(char => char.rarity === rarity).length;
      return counts;
    },
    {} as Record<Exclude<Rarity, 'H'>, number>,
  );

  const getRarityStyle = (avatarRarity: string | undefined) => {
    if (
      !avatarRarity ||
      !rarityOrder.includes(avatarRarity as Exclude<Rarity, 'H'>)
    ) {
      return defaultRarityStyle;
    }
    return rarityConfig[avatarRarity as Exclude<Rarity, 'H'>];
  };

  return (
    <div className='space-y-6 p-4'>
      {/* 등급 필터 버튼 */}
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
        {rarityOrder.map(rarity => (
          <Button
            key={rarity}
            onClick={() => setSelectedRarity(rarity)}
            className={cn(
              'border-2',
              selectedRarity === rarity
                ? `${rarityConfig[rarity].bg} text-white`
                : `${rarityConfig[rarity].bg} bg-opacity-20 ${rarityConfig[rarity].text}`,
            )}
          >
            {rarity}등급 ({rarityCounts[rarity] || 0})
          </Button>
        ))}
      </div>

      {/* 아이템 목록 */}
      <div className='grid grid-cols-7 gap-4'>
        {filteredAvatars.map(avatar => {
          const rarity = getRarityStyle(avatar.rarity);

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
                {/* 등급 뱃지 */}
                <div className={'absolute left-0 top-0 px-2'}>
                  <span className={cn('text-lg font-bold', rarity.text)}>
                    {avatar.rarity}
                  </span>
                </div>
                <img
                  src={`/cats/${avatar.name}.svg`}
                  alt={avatar.name}
                  className='h-32 w-full rounded-md object-cover'
                />
              </div>
              <div className='mt-2 space-y-1'>
                <h3 className='text-center font-bold text-gray-200'>
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
