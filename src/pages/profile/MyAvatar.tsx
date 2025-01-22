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

      <div className='max-h-[250px] w-full overflow-hidden rounded-lg border'>
        <img
          src={`domain/${userName}`}
          alt='Farm Preview'
          width={800}
          height={400}
          className='w-full object-contain'
        />
      </div>
    </div>
  );
};

export default MyAvatar;
