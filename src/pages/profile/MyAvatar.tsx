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
        <h2 className='text-3xl text-blue-400'>MY FARM</h2>
        <h3
          onClick={handleCopy}
          className='flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-xl font-bold text-white hover:bg-blue-600'
        >
          <Copy className='h-5 w-5' />
          {isCopied ? 'Copied!' : 'Copy Image Tag'}
        </h3>
      </div>

      <div className='max-h-[300px] w-full overflow-hidden rounded-lg border'>
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
