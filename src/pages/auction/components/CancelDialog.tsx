import { AuctionHistoryItem } from '@/apis/auction';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { cn, getCatKorName } from '@/lib/utils';

interface CancelDialogProps {
  item: AuctionHistoryItem;
  onCancel: (id: number) => void;
}

const CancelDialog = ({ item, onCancel }: CancelDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-blue-500 hover:bg-blue-600'>취소하기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className='text-center text-2xl'>취소 확인</p>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center text-base text-gray-200'>
            <span className={cn('font-bold', RARITY_CONFIG[item.rarity].text)}>
              {getCatKorName(item.name)}
            </span>
            을(를) 다시 데려올까요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => onCancel(item.id)}
            className='bg-blue-500 hover:bg-blue-600'
          >
            확인
          </AlertDialogAction>
          <AlertDialogCancel className='bg-gray-700 text-gray-200 hover:bg-gray-600'>
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;
