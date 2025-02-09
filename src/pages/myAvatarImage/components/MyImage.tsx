import { useState } from 'react';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

import { domain } from '@/apis/avatar';
import { useGetUserBackgroundImage } from '@/apis/background';
import { useGetUserAvatar } from '@/apis/user';

import OwnImageSelector from './OwnImageSelector';

interface MyImageProps {
  username: string;
}

export const MyImage = ({ username }: MyImageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [title, setTitle] = useState('');
  const [showElements, setShowElements] = useState({
    title: false,
    solvedProblems: false,
    tier: false,
    streak: false,
  });

  const { data: backgroundData } = useGetUserBackgroundImage();
  const { data: avatarData } = useGetUserAvatar();

  const visibleBackground = backgroundData?.backgrounds.find(bg => bg.visible);
  const [selectedBackground, setSelectedBackground] = useState(
    visibleBackground?.id || '',
  );

  const visibleAvatars = avatarData?.avatars.filter(a => a.visible).length ?? 0;

  const handleElementToggle = (element: keyof typeof showElements) => {
    setShowElements(prev => {
      const newState = { ...prev, [element]: !prev[element] };
      console.log('Updated display elements:', newState);
      return newState;
    });
  };

  const handleTitleSave = () => {
    console.log('Saving title:', title);
    toast.success('타이틀이 저장되었습니다.');
  };

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
    <div className='mx-auto max-w-5xl rounded-3xl border border-gray-600 bg-gray-900/50 p-4'>
      <div className='flex gap-4'>
        <div className='ml-2 mt-2 flex-1 space-y-4'>
          <div className='mb-10 flex items-center justify-between rounded-lg'>
            <span className='text-2xl font-bold text-white'>나만의 이미지</span>
            <button
              onClick={handleCopy}
              className='flex items-center gap-2 rounded-lg bg-blue-500/80 px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500'
            >
              <Copy className='h-4 w-4' />
              <span>{isCopied ? 'Copied!' : 'Copy Image Tag'}</span>
            </button>
          </div>

          <div className='aspect-[2/1] overflow-hidden rounded-[28px] border border-white/10 bg-gray-800/30'>
            <img
              src={`${domain}/compose/${username}?t=${visibleAvatars}&bg=${selectedBackground}&title=${showElements.title}&solved=${showElements.solvedProblems}&tier=${showElements.tier}&streak=${showElements.streak}&customTitle=${encodeURIComponent(title)}`}
              alt='Farm Preview'
              className='h-full w-full object-contain'
            />
          </div>
        </div>

        <div className='w-72 space-y-3'>
          <div className='rounded-lg border border-white/10 bg-gray-800/50 p-3'>
            <h4 className='mb-2 text-base font-medium text-slate-200'>
              타이틀 설정
            </h4>
            <div className='space-y-1.5'>
              <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='타이틀 입력'
                className='w-full rounded-md bg-gray-700/50 px-2.5 py-1.5 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none'
              />
              <button
                onClick={handleTitleSave}
                className='w-full rounded-md bg-blue-500/80 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500'
              >
                저장
              </button>
            </div>
          </div>

          <div className='rounded-lg border border-white/10 bg-gray-800/50 p-3'>
            <h4 className='mb-2 text-base font-medium text-slate-200'>
              배경 선택
            </h4>
            <OwnImageSelector
              selectedBackground={selectedBackground}
              onBackgroundChange={setSelectedBackground}
            />
          </div>

          <div className='rounded-lg border border-white/10 bg-gray-800/50 p-3'>
            <h4 className='mb-2 text-base font-medium text-slate-200'>
              표시 항목
            </h4>
            <div className='space-y-0.5'>
              <label className='flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={showElements.title}
                  onChange={() => handleElementToggle('title')}
                  className='h-4 w-4 rounded text-blue-500'
                />
                <span className='text-sm font-medium'>제목</span>
              </label>
              <label className='flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={showElements.solvedProblems}
                  onChange={() => handleElementToggle('solvedProblems')}
                  className='h-4 w-4 rounded text-blue-500 focus:ring-1 focus:ring-blue-500'
                />
                <span className='text-sm font-medium'>해결한 문제</span>
              </label>
              <label className='flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={showElements.tier}
                  onChange={() => handleElementToggle('tier')}
                  className='h-4 w-4 rounded text-blue-500 focus:ring-1 focus:ring-blue-500'
                />
                <span className='text-sm font-medium'>티어</span>
              </label>
              <label className='flex cursor-pointer items-center gap-2 rounded-md p-1.5 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={showElements.streak}
                  onChange={() => handleElementToggle('streak')}
                  className='h-4 w-4 rounded text-blue-500 focus:ring-1 focus:ring-blue-500'
                />
                <span className='text-sm font-medium'>스트릭</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyImage;
