import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import {
  ANIMATION_STEPS,
  ANIMATION_TIMING,
  AnimationStep,
  RARITY_TO_IMAGE,
  getCatKorName,
} from '../constants/catMappings';
import useImagePreloader, {
  GachaResultModalProps,
} from '../hooks/usePreloader';
import { SummaryView } from './SummaryView';

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
      setIsSummary(true);
    }, []);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;

        if (isAnimating) {
          setIsAnimating(false);
          setIsCapsuleVisible(true);
          setAnimationStep(ANIMATION_STEPS.COMPLETE);
          return;
        }

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
          if (isSingleDraw) {
            if (isAnimating) {
              setIsAnimating(false);
              setIsCapsuleVisible(true);
              setAnimationStep(ANIMATION_STEPS.COMPLETE);
            } else if (animationStep === ANIMATION_STEPS.COMPLETE) {
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
        <div className='relative h-96 w-96 rounded-lg bg-transparent'>
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
              <div className='translate-y-5 text-2xl font-bold text-white'>
                {getCatKorName(name)}
              </div>
            </div>
          )}

          {isCompleteStep && !isSingleDraw && (
            <div className='absolute bottom-[-30%] left-1/2 -translate-x-1/2 transform'>
              <button
                onClick={handleSkip}
                className='bg-transparent font-bold text-white underline'
              >
                ▶ Skip
              </button>
            </div>
          )}

          <div className='absolute left-1/2 top-[-50px] w-full -translate-x-1/2 transform'>
            <p className='animate-pulse text-center text-base font-semibold text-white'>
              {'Press Enter'}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

GachaResultModal.displayName = 'GachaResultModal';

export default GachaResultModal;
