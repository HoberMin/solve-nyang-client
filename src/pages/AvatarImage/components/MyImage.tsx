import { useState } from 'react';

import { Copy, Expand, Minimize } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { styles } from '../style';

export type BackgroundType = '우주배경' | '지구배경' | '공원배경';

interface MyImageProps {
  username: string;
  visibleAvatars: number;
}

export const MyImage = ({ username, visibleAvatars }: MyImageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [background, setBackground] = useState<BackgroundType>('우주배경');

  const handleCopy = async () => {
    try {
      const imgTag = `<a href="https://www.solve-nyang.com"><img src="https://api.solve-nyang.com/compose/${username}" width="600" height="300"/></a>`;
      await navigator.clipboard.writeText(imgTag);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success('이미지 태그가 복사되었습니다.', {
        description: 'Github README.md에 붙여넣기 하세요!',
      });
    } catch (err) {
      toast.error('복사에 실패했습니다.');
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={cn(
        styles.preview.wrapper,
        isExpanded ? 'mx-auto max-w-5xl' : 'mx-auto max-w-3xl',
      )}
    >
      <div className={styles.preview.header}>
        <h3 className={styles.preview.title}>MY Image</h3>
        <div className='flex items-center gap-2'>
          <div className={styles.backgroundSelect.wrapper}>
            <label className={styles.backgroundSelect.label}>배경:</label>
            <select
              className={styles.backgroundSelect.select}
              value={background}
              onChange={e => {
                const value = e.target.value as BackgroundType;
                setBackground(value);
                console.log('Selected background:', value);
              }}
            >
              {['우주배경', '지구배경', '공원배경'].map(bg => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.preview.iconButton}
            aria-label={isExpanded ? '축소' : '확대'}
          >
            {isExpanded ? (
              <Minimize className='h-4 w-4' />
            ) : (
              <Expand className='h-4 w-4' />
            )}
          </button>
          <button onClick={handleCopy} className={styles.preview.copyButton}>
            <Copy className='h-4 w-4' />
            <span>{isCopied ? 'Copied!' : 'Copy Image Tag'}</span>
          </button>
        </div>
      </div>
      <div
        className={cn(
          styles.preview.imageContainer,
          'transition-all duration-300',
          isExpanded ? 'max-h-[600px]' : 'max-h-[500px]',
        )}
      >
        <img
          src={`https://api.solve-nyang.com/compose/${username}?t=${visibleAvatars}&bg=${background}`}
          alt='Farm Preview'
          className={styles.preview.image}
        />
      </div>
    </div>
  );
};
