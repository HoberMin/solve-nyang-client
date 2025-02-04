import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

const ResetDialog = ({ isOpen, onClose, onReset }: ResetDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='border-gray-600 bg-gray-900'>
      <DialogHeader>
        <DialogTitle className='text-xl text-red-400'>초기화 확인</DialogTitle>
        <DialogDescription className='text-base text-gray-400'>
          <div className='space-y-4'>
            <p>선택한 고양이를 초기화하시겠습니까?</p>
            <div className='rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-400'>
              <p className='font-medium'>⚠️ 주의!</p>
              <p className='mt-2'>초기화하면 모든 선택이 해제됩니다.</p>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className='flex justify-end gap-4 pt-4'>
        <button
          onClick={onClose}
          className='cursor-pointer rounded-full px-4 py-2 text-base text-gray-400 hover:text-white'
        >
          취소
        </button>
        <button
          onClick={onReset}
          className='cursor-pointer rounded-full border border-red-400 px-4 py-2 text-base text-red-400 hover:bg-red-400 hover:text-gray-900'
        >
          확인
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ResetDialog;
