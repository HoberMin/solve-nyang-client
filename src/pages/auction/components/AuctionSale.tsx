import React, { useState } from 'react';

import { toast } from 'sonner';

import { useAuctionAvatar } from '@/apis/auction';
import { UserAvatar, useGetUserAvatar } from '@/apis/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

type Rarity = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

const rarityConfig: Record<
  Rarity,
  { border: string; text: string; bg: string }
> = {
  H: { border: 'border-[#26ffc9]', text: 'text-[#26ffc9]', bg: 'bg-[#26ffc9]' },
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]', bg: 'bg-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]', bg: 'bg-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]', bg: 'bg-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]', bg: 'bg-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]', bg: 'bg-[#a663ee]' },
};

const rarityOrder: Rarity[] = ['H', 'S', 'A', 'B', 'C', 'D'];

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
  const [error, setError] = useState('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setPrice(0);
      setError('1냥 이상의 가격을 입력해주세요.');
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      if (numValue <= 0) {
        setError('1냥 이상의 가격을 입력해주세요.');
      } else {
        setError('');
      }
      setPrice(numValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isConfirmDialogOpen) {
      handleConfirm();
    } else if (e.key === 'Enter') {
      handleProceed();
    }
  };

  const handleProceed = () => {
    if (price > 0) {
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
      <DialogContent
        className='border-transparent bg-gray-800 text-gray-200 sm:max-w-md'
        onKeyDown={handleKeyPress}
      >
        {!isConfirmDialogOpen ? (
          <div className='space-y-4'>
            <DialogTitle>
              <p className='text-center text-2xl'>판매</p>
            </DialogTitle>
            <DialogDescription className='h-12 text-center text-base text-gray-200'>
              <div className='flex gap-2'>
                <Label htmlFor='price' className='flex items-center'>
                  판매 가격
                </Label>
                <Input
                  id='price'
                  type='text'
                  value={price === 0 ? '' : price}
                  onChange={e => {
                    const value = e.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      handlePriceChange(e);
                    }
                  }}
                  onKeyDown={handleKeyPress}
                  className='flex-1 border-gray-600 bg-gray-700 text-gray-200'
                />
              </div>
              {error && <p className='text-sm text-red-500'>{error}</p>}
            </DialogDescription>
            <DialogFooter>
              <Button
                onClick={handleProceed}
                disabled={price <= 0}
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                다음
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className='space-y-4'>
            <DialogTitle>
              <p className='text-center text-2xl'>판매 확인</p>
            </DialogTitle>
            <DialogDescription className='text-center text-base text-gray-200'>
              <span
                className={cn('font-bold', rarityConfig[avatar.rarity]?.text)}
              >
                {getCatKorName(avatar.name)}
              </span>
              을(를){' '}
              <span className='font-bold text-blue-400'>
                {price.toLocaleString()}
              </span>
              냥에 판매하시겠습니까?
            </DialogDescription>
            <div className='flex justify-end space-x-2'>
              <Button
                onClick={handleConfirm}
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                판매
              </Button>
              <Button
                variant='outline'
                onClick={() => setIsConfirmDialogOpen(false)}
                className='border-gray-600 bg-transparent text-gray-200 hover:bg-gray-700'
              >
                이전
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
  const { mutate: auctionAvatar } = useAuctionAvatar();
  const [selectedAvatar, setSelectedAvatar] = useState<UserAvatar | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<'ALL' | Rarity>('ALL');

  const handleSell = (avatar: UserAvatar, price: number) => {
    auctionAvatar(
      {
        id: avatar.ownedAvatarId,
        price,
      },
      {
        onSuccess: () => {
          toast.success(
            `${getCatKorName(avatar.name)}을(를) ${price.toLocaleString()}냥에 판매 등록하였습니다.`,
          );
        },
      },
    );
  };

  const avatars = data?.avatars || [];

  const filteredAvatars =
    selectedRarity === 'ALL'
      ? avatars
      : avatars.filter(avatar => avatar.rarity === selectedRarity);

  const rarityCounts = rarityOrder.reduce<Record<Rarity, number>>(
    (counts, rarity) => {
      counts[rarity] = avatars.filter(char => char.rarity === rarity).length;
      return counts;
    },
    {} as Record<Rarity, number>,
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

      <div className='grid grid-cols-8 gap-4'>
        {filteredAvatars.map(avatar => {
          const rarity = rarityConfig[avatar.rarity as Rarity];

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
