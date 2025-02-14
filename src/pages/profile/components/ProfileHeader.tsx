import { Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSignOut } from '@/apis/sign';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  username: string;
}

export const ProfileHeader = ({ username }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className='mb-6 flex items-center gap-4'>
      <span className='mr-4 text-4xl font-bold text-white'>{username}</span>
      <button
        onClick={() => navigate('/change')}
        className={cn(
          'flex items-center rounded px-3 py-1.5 text-sm text-white transition',
          'bg-gray-700 hover:bg-gray-600',
        )}
      >
        <Lock size={16} className='mr-2' />
        비밀번호 변경
      </button>

      <button
        onClick={handleLogout}
        className={cn(
          'flex items-center rounded px-3 py-1.5 text-sm text-white transition',
          'bg-gray-700 hover:bg-gray-600',
        )}
      >
        <LogOut size={16} className='mr-2' />
        로그아웃
      </button>
    </div>
  );
};
