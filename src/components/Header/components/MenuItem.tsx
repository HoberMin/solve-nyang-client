import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';

interface RetroMenuItemProps extends PropsWithChildren {
  href: string;
}

const MenuItem = ({ children, href }: RetroMenuItemProps) => {
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

export default MenuItem;
