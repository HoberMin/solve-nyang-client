import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserInfo } from '@/apis/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RetroMenuItemProps extends PropsWithChildren {
  href: string;
}

const RetroMenuItem = ({ children, href }: RetroMenuItemProps) => {
  return (
    <Link to={href}>
      <div className='group relative cursor-pointer px-4'>
        <div
          className='absolute inset-0 -z-10 h-full w-full rounded opacity-0 blur transition-all duration-300 group-hover:opacity-30 group-hover:blur-md'
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          }}
        />
        <span
          className='relative inline-block bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-xl text-transparent transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:from-blue-200 group-hover:to-blue-400'
          style={{
            textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
          }}
        >
          {children}
        </span>
      </div>
    </Link>
  );
};

interface UserDropdownProps {
  username: string;
}

interface ActionDropdownProps {
  actionText: string;
}

const ActionDropdown = ({ actionText }: ActionDropdownProps) => {
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
          {actionText}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className='z-50 border-0 bg-gray-900 py-1'
          side='bottom'
          align='start'
        >
          {/* <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/auction' className='text-xl text-white hover:text-white'>
              경매장
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/sale' className='text-xl text-white hover:text-white'>
              캐릭터 판매
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

const UserDropdown: React.FC<UserDropdownProps> = ({ username }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('로그아웃 되었습니다.');
    window.location.href = '/';
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

const LoadingPulse = () => (
  <div className='flex space-x-1'>
    <div className='h-2 w-2 animate-pulse rounded-full bg-blue-400/50'></div>
    <div className='animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-blue-400/50'></div>
    <div className='animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-blue-400/50'></div>
  </div>
);

const Header = () => {
  const { data, isLoading } = useGetUserInfo();
  const isAuthenticated = Boolean(data?.username);

  return (
    <header className='relative z-10 flex h-16 items-center justify-between bg-gray-900 px-8'>
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
        `,
          backgroundSize: '8px 8px',
          animation: 'backgroundScroll 20s linear infinite',
        }}
      />
      <div className='flex items-center gap-4'>
        <div className='group cursor-pointer'>
          <Link to='/'>
            <span
              className='relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-2xl text-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-300'
              style={{
                textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
                WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
              }}
            >
              솔브냥
            </span>
          </Link>
          <div className='absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-400/50 to-blue-300/50 transition-all duration-300 group-hover:w-full' />
        </div>
      </div>
      <nav className='relative z-10 flex items-center gap-6'>
        <RetroMenuItem href='/event'>설 이벤트</RetroMenuItem>

        {isLoading ? (
          <LoadingPulse />
        ) : !isAuthenticated ? (
          <RetroMenuItem href='/login'>로그인</RetroMenuItem>
        ) : (
          <>
            <RetroMenuItem href='/contest'>공모전</RetroMenuItem>
            <RetroMenuItem href='/gacha'>뽑기</RetroMenuItem>
            <ActionDropdown actionText='상점' />
            <UserDropdown username={data?.username || 'User'} />
          </>
        )}
      </nav>
      <div
        className='animate-scanline opacity-3 pointer-events-none absolute inset-0'
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 2px)',
          backgroundSize: '4px 4px',
        }}
      />
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-30' />
    </header>
  );
};

export default Header;
