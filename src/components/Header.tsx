import { PropsWithChildren } from 'react';

import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserInfo } from '@/apis/user';
// shadcn 드롭다운 메뉴 컴포넌트 import 추가
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RetroMenuItemProps extends PropsWithChildren {
  href: string;
}

const RetroMenuItem = ({ children, href }: RetroMenuItemProps) => {
  return (
    <Link to={href}>
      <div className='group relative cursor-pointer'>
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

const RetroIcon = ({ children }: PropsWithChildren) => {
  return (
    <div className='group cursor-pointer'>
      <div className='relative transition-all duration-300 hover:scale-105'>
        <div className='absolute inset-0 animate-pulse opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50'>
          <div className='animate-spin-slow absolute inset-0'>{children}</div>
        </div>
        <div className='relative transition-all duration-150 group-hover:-translate-y-0.5'>
          {children}
        </div>
      </div>
    </div>
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
    <header className='relative flex h-16 items-center justify-between bg-gray-900 px-6'>
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

      <nav className='relative z-10 flex items-center gap-8'>
        {isLoading ? (
          <LoadingPulse />
        ) : !isAuthenticated ? (
          <RetroMenuItem href='/login'>로그인</RetroMenuItem>
        ) : (
          <>
            <div className='relative flex items-center'>
              <div className='relative'>
                <span
                  className='bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-xl text-transparent'
                  style={{
                    textShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
                    WebkitTextStroke: '1px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  {data?.username}
                </span>
              </div>
            </div>

            <RetroMenuItem href='/gacha'>GACHA</RetroMenuItem>
            <RetroMenuItem href='/auction'>AUCTION</RetroMenuItem>
            <RetroMenuItem href='/profile'>MY PAGE</RetroMenuItem>
          </>
        )}

        <a
          href='https://github.com/solve-nyang/solve-nyang-client'
          target='_blank'
          rel='noopener noreferrer'
        >
          <RetroIcon>
            <Github className='h-8 w-8 text-blue-400' />
          </RetroIcon>
        </a>
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
