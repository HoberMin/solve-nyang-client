import { useState } from 'react';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export const MyAvatar = () => {
  const userName = 'sonhomin98';
  const [isCopied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const imgTag = `<img src="domain/${userName}" />`;
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
    <div className='rounded-xl border p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='font-pixel text-lg text-blue-400'>MY FARM</h2>
        <button
          onClick={handleCopy}
          className='flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-blue-400'
        >
          <Copy className='h-4 w-4' />
          <span className='relative'>
            {isCopied ? 'Copied!' : 'Copy Image Tag'}
            {isCopied && (
              <span className='animate-progress absolute bottom-0 left-0 h-0.5 w-full bg-white' />
            )}
          </span>
        </button>
      </div>

      <div className='max-h-[300px] overflow-hidden rounded-lg border'>
        <div className='relative'>
          <img
            src={`domain/${userName}`}
            alt='Farm Preview'
            width={600}
            height={300}
            className='w-full'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};
