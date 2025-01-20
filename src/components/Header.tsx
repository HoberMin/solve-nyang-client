import { PropsWithChildren } from 'react';

import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useGetUserInfo } from '@/apis/user';

interface RetroMenuItemProps extends PropsWithChildren {
  href: string;
}

const RetroMenuItem = ({ children, href }: RetroMenuItemProps) => {
  return (
    <Link to={href}>
      <div className='group relative cursor-pointer'>
        {/* Background glow on hover */}
        <div
          className='absolute inset-0 -z-10 h-full w-full rounded opacity-0 blur transition-all duration-300 group-hover:opacity-30 group-hover:blur-md'
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          }}
        />

        {/* Text with hover effect */}
        <span
          className='relative inline-block bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-sm text-transparent transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:from-blue-200 group-hover:to-blue-400'
          style={{
            fontFamily: "'Press Start 2P', monospace",
            textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
          }}
        >
          {children}
        </span>

        {/* Pixel corners on hover */}
        <div className='absolute -left-1 -top-1 h-1.5 w-1.5 scale-0 bg-blue-400/50 transition-all duration-200 group-hover:scale-100' />
        <div className='absolute -right-1 -top-1 h-1.5 w-1.5 scale-0 bg-blue-400/50 transition-all duration-200 group-hover:scale-100' />
        <div className='absolute -bottom-1 -left-1 h-1.5 w-1.5 scale-0 bg-blue-400/50 transition-all duration-200 group-hover:scale-100' />
        <div className='absolute -bottom-1 -right-1 h-1.5 w-1.5 scale-0 bg-blue-400/50 transition-all duration-200 group-hover:scale-100' />
      </div>
    </Link>
  );
};

const RetroIcon = ({ children }: PropsWithChildren) => {
  return (
    <div className='group cursor-pointer'>
      <div className='relative transition-all duration-300 hover:scale-105'>
        {/* Rotating glow effect on hover */}
        <div className='absolute inset-0 animate-pulse opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50'>
          <div className='animate-spin-slow absolute inset-0'>{children}</div>
        </div>
        {/* Pixel movement on hover */}
        <div className='relative transition-all duration-150 group-hover:-translate-y-0.5'>
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  // const notifications = [
  //   { id: 1, message: '새로운 문제가 추가되었습니다!', isNew: true },
  //   { id: 2, message: '포인트가 적립되었습니다.', isNew: true },
  //   { id: 3, message: '새로운 업적을 달성했습니다!', isNew: false },
  // ];

  const { data } = useGetUserInfo();
  const { nickname } = data;

  return (
    <header className='relative flex h-16 items-center justify-between bg-gray-900 px-6'>
      {/* 격자 패턴 배경 with animation */}
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

      {/* Logo with hover animation */}
      <div
        className='group cursor-pointer'
        style={{
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        <span
          className='relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-2xl text-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-300'
          style={{
            textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
            WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
          }}
        >
          솔브냥
        </span>
        {/* Logo hover effect */}
        <div className='absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-400/50 to-blue-300/50 transition-all duration-300 group-hover:w-full' />
      </div>

      {/* Navigation */}
      <nav className='relative z-10 flex items-center gap-8'>
        {/* Nickname */}
        <div className='relative flex items-center'>
          {/* Nickname with pixel frame */}
          <div className='relative'>
            <div className='absolute -inset-1 opacity-30'>
              <div className='h-1 w-1 bg-blue-400' />
              <div className='absolute right-0 top-0 h-1 w-1 bg-blue-400' />
              <div className='absolute bottom-0 h-1 w-1 bg-blue-400' />
              <div className='absolute bottom-0 right-0 h-1 w-1 bg-blue-400' />
            </div>
            <span
              className='bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-sm text-transparent'
              style={{
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
                WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
              }}
            >
              {nickname}
            </span>
          </div>
        </div>

        {/* Shop */}
        <RetroMenuItem href='/gacha'>SHOP</RetroMenuItem>

        {/* MyPage */}
        <RetroMenuItem href='/profile'>MY PAGE</RetroMenuItem>

        {/* Notification Bell */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='relative'>
              <RetroIcon>
                <Bell className='h-5 w-5 text-blue-400' />
              </RetroIcon>
              {notifications.some(n => n.isNew) && (
                <div className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-400/70'>
                  <div className='absolute inset-0 animate-ping rounded-full bg-blue-400/50' />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='mt-2 w-64 border border-blue-400/20 bg-gray-900/95 p-1 shadow-[0_0_10px_rgba(59,130,246,0.2)] backdrop-blur'
          >
            {notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                className='group my-1 cursor-pointer bg-gray-800/30 p-3 hover:bg-gray-700/30'
              >
                <span
                  className='text-xs text-blue-400'
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: '0 0 3px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  {notification.message}
                </span>
                {notification.isNew && (
                  <span className='ml-2 text-[8px] text-blue-300/70'>NEW!</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Github */}
        <a
          href='https://github.com/solve-nyang/solve-nyang-client'
          target='_blank'
          rel='noopener noreferrer'
        >
          <RetroIcon>
            <Github className='h-5 w-5 text-blue-400' />
          </RetroIcon>
        </a>
      </nav>

      {/* Scanline effect */}
      <div
        className='animate-scanline opacity-3 pointer-events-none absolute inset-0'
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 2px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Bottom highlight */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-30' />
    </header>
  );
};

export default Header;
