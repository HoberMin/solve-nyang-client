import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionDropdownProps {
  actionText: string;
}

const StoreDropDown = ({ actionText }: ActionDropdownProps) => {
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
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/auction' className='text-xl text-white hover:text-white'>
              경매장
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link to='/sale' className='text-xl text-white hover:text-white'>
              캐릭터 판매
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='focus:bg-gray-800'>
            <Link
              to='/sale-background'
              className='text-xl text-white hover:text-white'
            >
              배경 상점
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default StoreDropDown;
