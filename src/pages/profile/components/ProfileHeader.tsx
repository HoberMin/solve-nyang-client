import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  username: string;
}

export const ProfileHeader = ({ username }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className='mb-6 flex items-center'>
      <span className='mr-4 text-4xl font-bold text-white'>{username}</span>
      <button
        onClick={() => navigate('/change')}
        className={cn(
          'flex items-center rounded px-3 py-1.5 text-sm text-white transition',
          'bg-gray-700 hover:bg-gray-600',
        )}
      >
        <Lock size={16} className='mr-1' />
        비밀번호 변경
      </button>
    </div>
  );
};
