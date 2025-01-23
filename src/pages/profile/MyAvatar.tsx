import { useEffect, useState } from 'react';

import { Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserAvatar, useGetUserInfo } from '@/apis/user';

export const MyAvatar = () => {
  const [isCopied, setCopied] = useState(false);

  const navigate = useNavigate();
  const { data, isPending } = useGetUserInfo();
  const { data: avatarList } = useGetUserAvatar();

  useEffect(() => {
    if (!isPending && !data?.username) {
      toast.error('로그인이 필요한 서비스입니다.', {
        description: '로그인 페이지로 이동합니다.',
        action: {
          label: '확인',
          onClick: () => navigate('/login'),
        },
      });
      navigate('/login');
    }
  }, [data, isPending, navigate]);

  if (!data?.username) {
    return null;
  }

  const handleCopy = async () => {
    try {
      const imgTag = `<img src="https://api.solve-nyang.com/compose/${data.username}" width="600" height="300"/>`;
      await navigator.clipboard.writeText(imgTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('이미지 태그가 복사되었습니다.');
    } catch (err) {
      toast.error('복사에 실패했습니다.');
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='rounded-xl border p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-lg font-bold text-blue-400'>MY FARM</span>
        <button
          onClick={handleCopy}
          className='flex items-center gap-1.5 rounded-lg bg-blue-500 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-600'
        >
          <Copy className='h-3.5 w-3.5' />
          {isCopied ? 'Copied!' : 'Copy Image Tag'}
        </button>
      </div>
      <div className='aspect-[2/1] w-full max-w-2xl overflow-hidden rounded-lg border'>
        <img
          src={`https://api.solve-nyang.com/compose/${data.username}?t=${avatarList.avatars.filter(e => e.visible).length}`}
          alt='Farm Preview'
          className='h-full w-full object-contain'
        />
      </div>
    </div>
  );
};

export default MyAvatar;
