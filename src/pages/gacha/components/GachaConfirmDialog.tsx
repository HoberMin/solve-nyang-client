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

import { DrawConfig } from '../constants/gacha';

interface GachaConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pendingDraw: DrawConfig | null;
  onConfirm: () => void;
}

export const GachaConfirmDialog = ({
  isOpen,
  onOpenChange,
  pendingDraw,
  onConfirm,
}: GachaConfirmDialogProps) => {
  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onConfirm();
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className='border-transparent bg-gray-800 text-gray-400'
        onKeyUp={handleEnterKey}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className='text-center text-2xl'>뽑기 확인</p>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center text-base text-gray-200'>
            {pendingDraw &&
              `${pendingDraw.cost}냥을 사용해서 ${pendingDraw.count}회 뽑기를 할까요?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onConfirm}
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
