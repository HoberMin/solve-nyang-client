import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getCatKorName } from '@/lib/utils';

import {
  ANIMATION_STEPS,
  ANIMATION_TIMING,
  AnimationStep,
  RARITY_TO_IMAGE,
} from '../constants/gacha';
import useImagePreloader, {
  GachaResultModalProps,
} from '../hooks/usePreloader';
import Confetti from './Confetti';
import { RARITY_INFO } from './SummaryItem';
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
    const [isConfetti, setIsConfetti] = useState(false);
    const animationCancelRef = useRef(false);
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

    const handleContinueClick = useCallback(() => {
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
    }, [
      isAnimating,
      isSingleDraw,
      isSummary,
      animationStep,
      handleNext,
      onOpenChange,
    ]);

    useEffect(() => {
      const handleKeyPress = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Enter') {
          if (isAnimating) {
            // 애니메이션 취소 플래그 설정
            animationCancelRef.current = true;
            setAnimationStep(ANIMATION_STEPS.COMPLETE);
            setIsAnimating(false);
            return;
          }

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
        setIsAnimating(false);
        animationCancelRef.current = false;
        return;
      }

      if (!isImagePreloading) return;

      let isSubscribed = true;

      const runAnimation = async () => {
        if (!isSubscribed) return;

        // 애니메이션 시작 전 취소 플래그 초기화
        animationCancelRef.current = false;
        setIsAnimating(true);

        if (isSingleDraw || currentIndex === 0) {
          setIsCapsuleVisible(true);
          setAnimationStep(ANIMATION_STEPS.CAPSULE);

          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.CAPSULE),
          );
          if (!isSubscribed || animationCancelRef.current) {
            setIsAnimating(false);
            return;
          }

          setAnimationStep(ANIMATION_STEPS.SHAKE);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.SHAKE),
          );
          if (!isSubscribed || animationCancelRef.current) {
            setIsAnimating(false);
            return;
          }

          setAnimationStep(ANIMATION_STEPS.OPEN);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.OPEN),
          );
          if (!isSubscribed || animationCancelRef.current) {
            setIsAnimating(false);
            return;
          }
        }

        setAnimationStep(ANIMATION_STEPS.COMPLETE);
        setIsAnimating(false);
      };

      if (currentResult && !isSummary) {
        runAnimation();
      }

      return () => {
        isSubscribed = false;
        animationCancelRef.current = true;
        setIsAnimating(false);
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
        // <SummaryView results={results} onBackdropClick={handleBackdropClick} />
        <SummaryView results={results} onOpenChange={onOpenChange} />
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
        // onClick={handleBackdropClick}
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
            <div className='absolute left-1/2 top-[-80px] flex w-full -translate-x-1/2 transform justify-center'>
              <button
                onClick={handleContinueClick}
                className='animate-pulse border-transparent bg-transparent p-0 text-center text-xl font-bold text-white hover:scale-110 focus:border-0 focus:outline-0 focus:ring-0'
              >
                엔터키를 누르거나 여기를 클릭하세요
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

GachaResultModal.displayName = 'GachaResultModal';

export default GachaResultModal;
