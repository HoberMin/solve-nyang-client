import React from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface VotingDialogProps {
  avatarTitle: string;
  onConfirm: () => void;
}

export const VotingDialog: React.FC<VotingDialogProps> = ({
  avatarTitle,
  onConfirm,
}) => {
  return (
    <AlertDialogContent className='border-transparent bg-gray-800 text-gray-200 sm:max-w-md'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-center'>
          <p className='text-2xl'>투표 확인</p>
        </AlertDialogTitle>
        <AlertDialogDescription className='text-center text-base text-gray-200'>
          정말로 <span className='font-bold text-blue-400'>{avatarTitle}</span>
          에게 투표하시겠습니까?
          <br />
          <p className='mt-1 text-sm text-gray-400'>
            ※ 한 번 투표하면 취소할 수 없습니다.
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='flex justify-end space-x-2'>
        <AlertDialogAction asChild>
          <Button
            onClick={onConfirm}
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            투표하기
          </Button>
        </AlertDialogAction>
        <AlertDialogCancel asChild>
          <Button
            variant='outline'
            className='border-gray-600 bg-transparent text-gray-200 hover:bg-gray-700'
          >
            취소
          </Button>
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
