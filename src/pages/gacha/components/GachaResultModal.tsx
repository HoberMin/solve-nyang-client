import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import {
  ANIMATION_STEPS,
  ANIMATION_TIMING,
  AnimationStep,
  RARITY_TO_IMAGE,
  getCatKorName,
} from '../constants/catMappings';
import { RARITY_INFO } from '../constants/rarityInfo';
import useImagePreloader, {
  GachaResultModalProps,
} from '../hooks/usePreloader';
import Confetti from './Confetti';
import { SummaryView } from './SummaryView';

interface RarityInfo {
  dropRate: string;
  color: string;
}

const RARITY_INFO: Record<string, RarityInfo> = {
  S: { dropRate: '1', color: '#f74600' },
  A: { dropRate: '4', color: '#ffc337' },
  B: { dropRate: '30', color: '#7abf16' },
  C: { dropRate: '45', color: '#108df1' },
  D: { dropRate: '20', color: '#a663ee' },
};

export const GachaResultModal = memo(
  ({
    isOpen,
    onOpenChange,
    results,
    isSingleDraw = true,
  }: GachaResultModalProps) => {
    const [animationStep, setAnimationStep] = useState<AnimationStep>(
      ANIMATION_STEPS.INITIAL,
    );
    const [isCapsuleVisible, setIsCapsuleVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSummary, setIsSummary] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isConfetti, setIsConfetti] = useState(false);

    // 필요한 모든 이미지 URL 수집
    const imagesToPreload = useMemo(() => {
      if (!results.length) return [];

      const urls = new Set<string>();

      results.forEach(result => {
        const capsuleImages =
          RARITY_TO_IMAGE[result.rarity as keyof typeof RARITY_TO_IMAGE];
        urls.add(capsuleImages.capsule);
        urls.add(capsuleImages.opened);
        urls.add(`/cats/${result.name}.svg`);
      });

      return Array.from(urls);
    }, [results]);

    // 이미지 프리로딩 상태 관리
    const isImagePreloading = useImagePreloader(imagesToPreload);

    const currentResult = useMemo(
      () => results[currentIndex],
      [results, currentIndex],
    );

    useEffect(() => {
      if (
        animationStep === ANIMATION_STEPS.COMPLETE &&
        currentResult &&
        (currentResult.rarity === 'S' || currentResult.rarity === 'A')
      ) {
        setIsConfetti(true);
      } else {
        setIsConfetti(false);
      }
    }, [animationStep, currentResult]);

    const handleNext = useCallback(() => {
      if (isAnimating) return;

      if (currentIndex < results.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnimationStep(ANIMATION_STEPS.INITIAL);
      } else {
        setIsSummary(true);
      }
    }, [currentIndex, results.length, isAnimating]);

    const handleSkip = useCallback(() => {
      if (isAnimating) return;
      setIsSummary(true);
    }, []);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;

        if (isAnimating) return;

        if (!isSingleDraw && !isSummary) {
          if (currentIndex < results.length - 1) {
            handleNext();
          } else {
            setIsSummary(true);
          }
          return;
        }

        onOpenChange(false);
      },
      [
        isAnimating,
        isSingleDraw,
        isSummary,
        currentIndex,
        results.length,
        handleNext,
        onOpenChange,
      ],
    );

    useEffect(() => {
      const handleKeyPress = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Enter') {
          if (isAnimating) return;

          if (isSingleDraw) {
            if (animationStep === ANIMATION_STEPS.COMPLETE) {
              onOpenChange(false);
            }
          } else {
            if (isSummary) {
              onOpenChange(false);
            } else {
              handleNext();
            }
          }
        }
      };

      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }, [
      handleNext,
      isSummary,
      isAnimating,
      isSingleDraw,
      animationStep,
      onOpenChange,
    ]);

    useEffect(() => {
      if (!isOpen) {
        setAnimationStep(ANIMATION_STEPS.INITIAL);
        setIsCapsuleVisible(false);
        setCurrentIndex(0);
        setIsSummary(false);
        return;
      }

      if (!isImagePreloading) return;

      let isSubscribed = true;

      const runAnimation = async () => {
        if (!isSubscribed) return;
        setIsAnimating(true);

        if (isSingleDraw || currentIndex === 0) {
          setIsCapsuleVisible(true);
          setAnimationStep(ANIMATION_STEPS.CAPSULE);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.CAPSULE),
          );
          if (!isSubscribed) return;

          setAnimationStep(ANIMATION_STEPS.SHAKE);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.SHAKE),
          );
          if (!isSubscribed) return;

          setAnimationStep(ANIMATION_STEPS.OPEN);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.OPEN),
          );
          if (!isSubscribed) return;
        }

        setAnimationStep(ANIMATION_STEPS.COMPLETE);
        setIsAnimating(false);
      };

      if (currentResult && !isSummary) {
        runAnimation();
      }

      return () => {
        isSubscribed = false;
      };
    }, [
      isOpen,
      currentResult,
      currentIndex,
      isSingleDraw,
      isSummary,
      isImagePreloading,
    ]);

    // 로딩 중일 때 표시할 내용
    if (!isImagePreloading) {
      return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
          <div className='text-white'>Loading...</div>
        </div>
      );
    }

    if (!isOpen || !currentResult) return null;

    if (isSummary) {
      return (
        <SummaryView results={results} onBackdropClick={handleBackdropClick} />
      );
    }

    const { name, rarity } = currentResult;
    const capsuleImages =
      RARITY_TO_IMAGE[rarity as keyof typeof RARITY_TO_IMAGE];
    const isCompleteStep = animationStep === ANIMATION_STEPS.COMPLETE;
    const isOpenStep = animationStep === ANIMATION_STEPS.OPEN;
    const isShakeStep = animationStep === ANIMATION_STEPS.SHAKE;

    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
        onClick={handleBackdropClick}
      >
        {isConfetti && <Confetti />}
        <div className='relative z-50 h-96 w-96 rounded-lg bg-transparent'>
          {isCapsuleVisible && (
            <img
              src={
                isOpenStep || isCompleteStep
                  ? capsuleImages.opened
                  : capsuleImages.capsule
              }
              alt='Gacha Capsule'
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform ${
                isShakeStep ? 'animate-shake' : ''
              } ${isOpenStep ? 'animate-open' : ''}`}
            />
          )}

          {isCompleteStep && (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform text-center'>
              <div className='absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-300/30 blur-xl' />
              <img src={`/cats/${name}.svg`} alt={name} className='scale-150' />
              <div className='flex translate-y-20 justify-center gap-4'>
                <div
                  className='text-2xl font-bold'
                  style={{ color: RARITY_INFO[rarity].color }}
                >
                  {rarity}
                </div>
                <div className='text-2xl font-bold text-white'>
                  {getCatKorName(name)}
                </div>
              </div>
            </div>
          )}

          {isCompleteStep && !isSingleDraw && (
            <div className='absolute bottom-[-40%] left-1/2 -translate-x-1/2 transform'>
              <button
                onClick={handleSkip}
                className='bg-transparent text-lg font-bold text-gray-300 underline hover:scale-110'
              >
                ▶ Skip
              </button>
            </div>
          )}
          {isCompleteStep && (
            <div className='absolute left-1/2 top-[-80px] w-full -translate-x-1/2 transform'>
              <p className='animate-pulse text-center text-lg font-semibold text-white'>
                {'Press Enter'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

GachaResultModal.displayName = 'GachaResultModal';

export default GachaResultModal;
