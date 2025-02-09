import React from 'react';

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { VotingDialog } from './VotingDialog';

interface VotingAvatarProps {
  id: number;
  imageUrl: string;
  title: string;
  onVote: (id: number) => void;
}
export const VotingAvatar: React.FC<VotingAvatarProps> = ({
  id,
  imageUrl,
  title,
  onVote,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='flex flex-col items-center'>
          <img
            src={imageUrl}
            alt={title}
            className='mb-4 h-36 w-36 cursor-pointer rounded-lg transition-transform hover:scale-125'
          />
          <h3 className='mb-2 text-xl font-bold text-gray-200'>{title}</h3>
        </div>
      </AlertDialogTrigger>
      <VotingDialog avatarTitle={title} onConfirm={() => onVote(id)} />
    </AlertDialog>
  );
};
