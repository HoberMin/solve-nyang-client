import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { DrawConfig } from '@/types/gacha';

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
        className='text-lg text-black'
        onKeyUp={handleEnterKey}
      >
        {pendingDraw &&
          `${pendingDraw.cost}냥을 사용해서 ${pendingDraw.count}회 뽑기를 할까요?`}
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
