import { useEffect, useState } from 'react';

import { Avatar } from '@/apis/avatar';

interface GachaResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  results: Avatar[];
  isSingleDraw?: boolean;
}

const ANIMATION_STEPS = {
  INITIAL: 'initial',
  CAPSULE: 'capsule',
  SHAKE: 'shake',
  OPEN: 'open',
  COMPLETE: 'complete',
} as const;

type AnimationStep = (typeof ANIMATION_STEPS)[keyof typeof ANIMATION_STEPS];

const RARITY_TO_IMAGE = {
  A: {
    capsule: 'public/cats/ball/a1-3.svg',
    opened: 'public/cats/ball/a1-4.svg',
  },
  B: {
    capsule: 'public/cats/ball/b1-3.svg',
    opened: 'public/cats/ball/b1-4.svg',
  },
  C: {
    capsule: 'public/cats/ball/c1-3.svg',
    opened: 'public/cats/ball/c1-4.svg',
  },
  D: {
    capsule: 'public/cats/ball/d1-3.svg',
    opened: 'public/cats/ball/d1-4.svg',
  },
  S: {
    capsule: 'public/cats/ball/s1-3.svg',
    opened: 'public/cats/ball/s1-4.svg',
  },
};

export const GachaResultModal = ({
  isOpen,
  onOpenChange,
  results,
  isSingleDraw = true,
}: GachaResultModalProps) => {
  const [animationStep, setAnimationStep] = useState<AnimationStep>(
    ANIMATION_STEPS.INITIAL,
  );
  const [showCapsule, setShowCapsule] = useState(false);

  const result = results[0];

  useEffect(() => {
    if (!isOpen) {
      setAnimationStep(ANIMATION_STEPS.INITIAL);
      setShowCapsule(false);
      return;
    }

    const runAnimation = async () => {
      setShowCapsule(true);
      setAnimationStep(ANIMATION_STEPS.CAPSULE);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnimationStep(ANIMATION_STEPS.SHAKE);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnimationStep(ANIMATION_STEPS.OPEN);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnimationStep(ANIMATION_STEPS.COMPLETE);
    };

    if (result) {
      runAnimation();
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  const { name, rarity } = result;
  const capsuleImages = RARITY_TO_IMAGE[rarity as keyof typeof RARITY_TO_IMAGE];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleBackdropClick}
    >
      <div className='relative h-96 w-96 rounded-lg bg-transparent'>
        {/* 캡슐 이미지 */}
        {showCapsule && (
          <img
            src={
              animationStep === ANIMATION_STEPS.OPEN ||
              animationStep === ANIMATION_STEPS.COMPLETE
                ? capsuleImages.opened
                : capsuleImages.capsule
            }
            alt='Gacha Capsule'
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform ${
              animationStep === ANIMATION_STEPS.SHAKE ? 'animate-shake' : ''
            } ${animationStep === ANIMATION_STEPS.OPEN ? 'animate-open' : ''}`}
          />
        )}

        {/* 고양이 이미지 */}
        {animationStep === ANIMATION_STEPS.COMPLETE && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform text-center'>
            <img src={`/cats/${name}.svg`} alt={name} className='h-48 w-48' />
            <div className='mt-4 text-2xl font-bold text-white'>{name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GachaResultModal;
