import { useState } from 'react';

import { Copy, Expand, Minimize } from 'lucide-react';
import { toast } from 'sonner';

import { domain } from '@/apis/avatar';
import { useGetUserBackgroundImage } from '@/apis/background';
import { useGetUserAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';

import { styles } from '../style';
import OwnImageSelector from './OwnImageSelector';

interface MyImageProps {
  username: string;
}

export const MyImage = ({ username }: MyImageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: backgroundData } = useGetUserBackgroundImage();
  const { data: avatarData } = useGetUserAvatar();

  const visibleBackground = backgroundData?.backgrounds.find(bg => bg.visible);
  const [selectedBackground, setSelectedBackground] = useState(
    visibleBackground?.id || '',
  );

  const visibleAvatars = avatarData?.avatars.filter(a => a.visible).length ?? 0;

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
          <OwnImageSelector
            selectedBackground={selectedBackground}
            onBackgroundChange={setSelectedBackground}
          />
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
          src={`${domain}/compose/${username}?t=${visibleAvatars}&bg=${selectedBackground}`}
          alt='Farm Preview'
          className={styles.preview.image}
        />
      </div>
    </div>
  );
};
