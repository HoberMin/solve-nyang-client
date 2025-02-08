import { useState } from 'react';

import { toast } from 'sonner';

import { AuctionMessageResponse, Merchandise } from '@/apis/auction';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn, getCatKorName } from '@/lib/utils';

import { RARITY_CONFIG } from '../../../constant/rarityconfig';

interface PurchaseButtonProps {
  item: Merchandise;
  onPurchase: (id: number) => Promise<AuctionMessageResponse | null>;
}

const PurchaseButton = ({ item, onPurchase }: PurchaseButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    if (item.isMine) {
      toast.error('자신이 올린 상품은 구매할 수 없습니다.');
      return;
    }
    setIsDialogOpen(true);
  };

  const handlePurchase = async () => {
    await onPurchase(item.id);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        disabled={item.sold}
        onClick={handleClick}
        className={'w-22 bg-blue-500/80 hover:bg-blue-600/80'}
      >
        구매하기
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className='text-center text-2xl'>구매 확인</p>
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base text-gray-200'>
              <span
                className={cn('font-bold', RARITY_CONFIG[item.rarity]?.text)}
              >
                {getCatKorName(item.name)}
              </span>
              을(를){' '}
              <span className='font-bold text-blue-400'>
                {item.price.toLocaleString()}냥
              </span>
              에 구매하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handlePurchase}
              className='bg-blue-500 hover:bg-blue-600'
            >
              구매
            </AlertDialogAction>
            <AlertDialogCancel className='bg-gray-700 text-gray-200 hover:bg-gray-600'>
              취소
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PurchaseButton;
