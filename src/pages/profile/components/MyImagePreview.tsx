import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { domain } from '@/apis/avatar';
import { useGetUserInfo } from '@/apis/user';
import { cn } from '@/lib/utils';

const MyImagePreview = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useGetUserInfo();
  const username = userInfo?.username;

  return (
    <div className='overflow-hidden rounded-lg border-white/10'>
      <div className='flex flex-grow flex-col rounded-lg bg-white/10 p-10 py-5 backdrop-blur-sm'>
        <div className='flex flex-row items-center'>
          <span className='m-4 text-3xl font-bold text-white'>
            나만의 이미지
          </span>
          <button
            onClick={() => navigate('/image')}
            className={cn(
              'flex items-center rounded px-3 py-1.5 text-sm text-white transition',
              'bg-gray-700 hover:bg-gray-600',
            )}
          >
            만들기
            <ArrowUpRight size={16} className='ml-1' />
          </button>
        </div>
        <div className='mt-3'>
          <img
            src={`${domain}/compose/${username}`}
            width='600'
            height='300'
            alt='Farm Preview'
            className='h-full w-full object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default MyImagePreview;
