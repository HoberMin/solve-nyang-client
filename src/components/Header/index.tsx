import { Link } from 'react-router-dom';

import { useGetUserInfo } from '@/apis/user';

import MenuItem from './components/MenuItem';
import StoreDropDown from './components/StoreDropDown';
import UserDropdown from './components/UserDropDown';

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
        {isLoading ? (
          <LoadingPulse />
        ) : !isAuthenticated ? (
          <MenuItem href='/login'>로그인</MenuItem>
        ) : (
          <>
            <MenuItem href='/contest'>공모전</MenuItem>
            <MenuItem href='/gacha'>뽑기 </MenuItem>
            <StoreDropDown actionText='상점' />
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
