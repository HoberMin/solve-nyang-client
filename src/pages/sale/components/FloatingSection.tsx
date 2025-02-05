import { useState } from 'react';

import { UserAvatar } from '@/apis/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface FloatingActionsProps {
  selectedAvatars: UserAvatar[];
  hasDuplicates: boolean;
  totalPoints: number;
  onSelectDuplicates: () => void;
  onReset: () => void;
  onSale: () => void;
}

export const FloatingSection = ({
  selectedAvatars,
  hasDuplicates,
  totalPoints,
  onSelectDuplicates,
  onReset,
  onSale,
}: FloatingActionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCanSale = selectedAvatars.length > 0;

  const handleSale = () => {
    onSale();
    setIsDialogOpen(false);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 flex justify-center gap-4 border-t border-gray-800 bg-gray-900/95 px-6 py-4 backdrop-blur-sm'>
      <span
        role='button'
        tabIndex={0}
        onClick={hasDuplicates ? onSelectDuplicates : undefined}
        onKeyDown={e => {
          if (e.key === 'Enter' || (e.key === ' ' && hasDuplicates)) {
            e.preventDefault();
            onSelectDuplicates();
          }
        }}
        className={cn(
          'rounded-full border-2 px-4 py-2 text-base transition-colors',
          hasDuplicates
            ? 'cursor-pointer border-purple-500 bg-gray-800 text-purple-500 hover:bg-purple-500 hover:text-white'
            : 'cursor-not-allowed border-gray-700 bg-gray-800/50 text-gray-700',
        )}
      >
        중복선택
      </span>

      <span
        role='button'
        tabIndex={0}
        onClick={isCanSale ? onReset : undefined}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && isCanSale) {
            e.preventDefault();
            onReset();
          }
        }}
        className={cn(
          'rounded-full border-2 px-4 py-2 text-base transition-colors',
          isCanSale
            ? 'cursor-pointer border-red-500 bg-gray-800 text-red-500 hover:bg-red-500 hover:text-white'
            : 'cursor-not-allowed border-gray-700 bg-gray-800/50 text-gray-700',
        )}
      >
        초기화
      </span>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <span
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ') && isCanSale) {
                e.preventDefault();
                setIsDialogOpen(true);
              }
            }}
            className={cn(
              'cursor-pointer rounded-full border px-6 py-2 text-base transition-colors',
              isCanSale
                ? 'border-blue-400 bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
                : 'cursor-not-allowed border-gray-700 bg-gray-800/50 text-gray-700',
            )}
          >
            판매하기
          </span>
        </DialogTrigger>
        <DialogContent className='border-gray-600 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-xl text-blue-400'>
              판매 확인
            </DialogTitle>
            <DialogDescription className='text-base text-gray-400'>
              <div className='space-y-4'>
                <p>{selectedAvatars.length}개의 아바타를 판매하시겠습니까?</p>

                <div className='rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-400'>
                  <p className='font-medium'>⚠️ 주의!</p>
                  <p className='mt-2'>
                    판매한 아바타는 환불, 거래가 불가능합니다.
                  </p>
                  <p className='mt-2 font-medium'>정말로 판매하시겠습니까?</p>
                </div>

                <span className='block text-lg text-blue-400'>
                  획득 냥코인: {totalPoints}P
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-4 pt-4'>
            <span
              role='button'
              tabIndex={0}
              onClick={() => setIsDialogOpen(false)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDialogOpen(false);
                }
              }}
              className='cursor-pointer rounded-full px-4 py-2 text-base text-gray-400 hover:text-white'
            >
              취소
            </span>
            <span
              role='button'
              tabIndex={0}
              onClick={handleSale}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSale();
                }
              }}
              className='cursor-pointer rounded-full border border-blue-400 px-4 py-2 text-base text-blue-400 hover:bg-blue-400 hover:text-gray-900'
            >
              확인
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingSection;
