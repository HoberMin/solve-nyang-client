import { Link } from 'react-router-dom';

import { useSignOut } from '@/apis/sign';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserDropdownProps {
  username: string;
}

const UserDropdown = ({ username }: UserDropdownProps) => {
  const { mutate: signOut } = useSignOut();

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer bg-transparent outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0'>
        <span
          className='relative inline-block bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-xl text-transparent'
          style={{
            textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
          }}
        >
          {username}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className='z-50 border-0 bg-gray-900 py-1'
          side='bottom'
          align='start'
        >
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/profile' className='text-xl text-white hover:text-white'>
              프로필
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/image' className='text-xl text-white hover:text-white'>
              나만의 이미지
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link
              to='/extension'
              className='text-xl text-white hover:text-white'
            >
              솔브냥 익스텐션
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-xl text-white focus:bg-gray-800'
            onClick={handleLogout}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default UserDropdown;
