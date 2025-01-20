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
          className={`relative flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold text-white transition-all duration-300 ${isCopied ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-600`}
          style={{
            boxShadow: isCopied
              ? '0 0 10px rgba(72, 187, 120, 0.8)'
              : '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Copy className='h-5 w-5' />
          <span
            className={`transition-transform ${
              isCopied ? 'animate-bounce' : ''
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy Image Tag'}
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
