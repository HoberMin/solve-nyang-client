import { useState } from 'react';

import { Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { domain } from '@/apis/avatar';
import { useGetUserBackgroundImage } from '@/apis/background';
import {
  useGetUserDisplayInfo,
  usePatchClassToggle,
  usePatchSolvedToggle,
  usePatchStreakToggle,
  usePatchTierToggle,
  usePatchTitle,
  usePatchTitleToggle,
} from '@/apis/display';
import { useGetUserAvatar } from '@/apis/user';

import OwnImageSelector from './OwnImageSelector';

interface MyImageProps {
  username: string;
}

interface TitleFormData {
  title: string;
}

export const MyImage = ({ username }: MyImageProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const { data } = useGetUserDisplayInfo();
  const {
    title,
    titleVisible: isTitleVisible,
    tierVisible: isTierVisible,
    solvedCountVisible: isSolvedCountVisible,
    memberClassVisible: isMemberClassVisible,
    streakVisible: isStreakVisible,
  } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleFormData>({
    defaultValues: {
      title: title?.trim() || '',
    },
  });

  const patchTitle = usePatchTitle();
  const patchTierToggle = usePatchTierToggle();
  const patchStreakToggle = usePatchStreakToggle();
  const patchClassToggle = usePatchClassToggle();
  const patchTitleToggle = usePatchTitleToggle();
  const patchSolvedToggle = usePatchSolvedToggle();

  const { data: backgroundData } = useGetUserBackgroundImage();
  const { data: avatarData } = useGetUserAvatar();

  const visibleBackground = backgroundData?.backgrounds.find(bg => bg.visible);
  const [selectedBackground, setSelectedBackground] = useState(
    visibleBackground?.id || '',
  );

  const visibleAvatars = avatarData?.avatars.filter(a => a.visible).length ?? 0;

  const handleCopy = async () => {
    try {
      const imgTag = `<a href="https://www.solve-nyang.com"><img src="${domain}/compose/${username}" width="600" height="300"/></a>`;
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

  const onSubmit = (data: TitleFormData) => {
    patchTitle(data.title.trim());
  };

  return (
    <div className='mx-auto max-w-6xl rounded-3xl border border-gray-600 bg-gray-900/50 p-4'>
      <div className='flex gap-4'>
        <div className='ml-2 mt-2 flex-1 space-y-4'>
          <div className='mb-10 flex items-center justify-between rounded-lg'>
            <span className='text-3xl font-bold text-white'>나만의 이미지</span>
            <button
              onClick={handleCopy}
              className='flex items-center gap-2 rounded-lg bg-blue-500/80 px-4 py-2 text-base font-medium text-white transition-all duration-200 hover:bg-blue-500'
            >
              <Copy className='h-5 w-5' />
              <span>{isCopied ? 'Copied!' : 'Copy Image Tag'}</span>
            </button>
          </div>

          <div className='aspect-[2/1] overflow-hidden rounded-[28px] border border-white/10 bg-gray-800/30'>
            <img
              src={`${domain}/compose/${username}?t=${visibleAvatars}&bg=${selectedBackground}&class=${isStreakVisible}&title=${isTitleVisible}&solved=${isTierVisible}&tier=${isSolvedCountVisible}&streak=${isMemberClassVisible}&customTitle=${encodeURIComponent(title)}`}
              alt='Farm Preview'
              className='h-full w-full object-contain'
            />
          </div>
        </div>

        <div className='w-72 space-y-6 rounded-lg bg-gray-800/50 p-4'>
          <div>
            <h4 className='mb-3 text-lg font-medium text-slate-200'>
              타이틀 설정
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
              <input
                {...register('title', {
                  required: '타이틀을 입력해주세요',
                  pattern: {
                    value: /^[A-Za-z0-9]{2,15}$/,
                    message: '영문, 숫자 2~15자로 입력해주세요',
                  },
                  setValueAs: (value: string) => value.trim(),
                })}
                placeholder='타이틀 입력'
                className='w-full rounded-md bg-gray-700/50 px-3 py-2 text-base text-slate-200 placeholder:text-slate-400 focus:outline-none'
              />
              {errors.title && (
                <p className='text-sm text-red-500'>{errors.title.message}</p>
              )}
              <button
                type='submit'
                className='w-full rounded-md bg-blue-500/80 px-3 py-2 text-base font-medium text-white transition-colors hover:bg-blue-500'
              >
                저장
              </button>
            </form>
          </div>

          <OwnImageSelector
            selectedBackground={selectedBackground}
            onBackgroundChange={setSelectedBackground}
          />

          <div>
            <h4 className='mb-3 text-lg font-medium text-slate-200'>
              표시 항목
            </h4>
            <div className='space-y-2'>
              <label className='flex cursor-pointer items-center gap-3 rounded-md p-2 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={isTitleVisible}
                  onChange={() => patchTitleToggle()}
                  className='h-5 w-5 rounded text-blue-500'
                />
                <span className='text-base font-medium'>제목</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3 rounded-md p-2 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={isSolvedCountVisible}
                  onChange={() => patchSolvedToggle()}
                  className='h-5 w-5 rounded text-blue-500'
                />
                <span className='text-base font-medium'>해결한 문제</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3 rounded-md p-2 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={isTierVisible}
                  onChange={() => patchTierToggle()}
                  className='h-5 w-5 rounded text-blue-500'
                />
                <span className='text-base font-medium'>티어</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3 rounded-md p-2 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={isStreakVisible}
                  onChange={() => patchStreakToggle()}
                  className='h-5 w-5 rounded text-blue-500'
                />
                <span className='text-base font-medium'>스트릭</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3 rounded-md p-2 text-slate-300 transition-colors hover:text-blue-300'>
                <input
                  type='checkbox'
                  checked={isMemberClassVisible}
                  onChange={() => patchClassToggle()}
                  className='h-5 w-5 rounded text-blue-500'
                />
                <span className='text-base font-medium'>등급</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyImage;
