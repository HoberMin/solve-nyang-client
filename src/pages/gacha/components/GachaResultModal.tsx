import { useEffect, useState } from 'react';

import { Avatar } from '@/apis/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { CAT_MAPPINGS } from '../constants/catMappings';
import a13ImageUrl from '/public/cats/ball/a1-3.svg';
import a14ImageUrl from '/public/cats/ball/a1-4.svg';
import b13ImageUrl from '/public/cats/ball/b1-3.svg';
import b14ImageUrl from '/public/cats/ball/b1-4.svg';
import c13ImageUrl from '/public/cats/ball/c1-3.svg';
import c14ImageUrl from '/public/cats/ball/c1-4.svg';
import d13ImageUrl from '/public/cats/ball/d1-3.svg';
import d14ImageUrl from '/public/cats/ball/d1-4.svg';
import s13ImageUrl from '/public/cats/ball/s1-3.svg';
import s14ImageUrl from '/public/cats/ball/s1-4.svg';

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
  A: { capsule: a13ImageUrl, opened: a14ImageUrl },
  B: { capsule: b13ImageUrl, opened: b14ImageUrl },
  C: { capsule: c13ImageUrl, opened: c14ImageUrl },
  D: { capsule: d13ImageUrl, opened: d14ImageUrl },
  S: { capsule: s13ImageUrl, opened: s14ImageUrl },
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

  if (!result) return null;

  const { name, rarity } = result;
  const capsuleImages = RARITY_TO_IMAGE[rarity as keyof typeof RARITY_TO_IMAGE];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className='overflow-hidden rounded-lg border-none bg-transparent p-0 shadow-xl'
        // showIconCloseButton={false}
      >
        <div className='relative h-96 w-96'>
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
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ${
                animationStep === ANIMATION_STEPS.SHAKE ? 'animate-shake' : ''
              } ${animationStep === ANIMATION_STEPS.OPEN ? 'animate-open' : ''}`}
            />
          )}

          {/* 고양이 이미지 */}
          {animationStep === ANIMATION_STEPS.COMPLETE && (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
              <img
                src={getCatImagePath(name)}
                alt={getCatKorName(name)}
                className='h-48 w-48'
              />
              <div className='mt-4 text-2xl font-bold text-white'>
                {getCatKorName(name)}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const getCatImagePath = (engName: string): string => {
  return `/cats/${engName}.svg`;
};

export const getCatKorName = (engName: string): string => {
  return CAT_MAPPINGS[engName]?.korName || engName;
};
