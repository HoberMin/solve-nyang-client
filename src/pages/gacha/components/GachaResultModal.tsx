import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Avatar } from '@/apis/avatar';

import { getCatKorName } from '../constants/catMappings.ts';

interface GachaResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  results: Avatar[];
  isSingleDraw?: boolean;
}

const ANIMATION_STEPS = {
  INITIAL: 'initial', // 초기 상태
  CAPSULE: 'capsule', // 캡슐 등장
  SHAKE: 'shake', // 흔들기 애니메이션
  OPEN: 'open', // 캡슐 열기 애니메이션
  COMPLETE: 'complete', // 결과
} as const;

type AnimationStep = (typeof ANIMATION_STEPS)[keyof typeof ANIMATION_STEPS];

const RARITY_TO_IMAGE = {
  S: {
    capsule: '/cats/ball/S1-3.svg',
    opened: '/cats/ball/S1-4.svg',
  },
  A: {
    capsule: '/cats/ball/A1-3.svg',
    opened: '/cats/ball/A1-4.svg',
  },
  B: {
    capsule: '/cats/ball/B1-3.svg',
    opened: '/cats/ball/B1-4.svg',
  },
  C: {
    capsule: '/cats/ball/C1-3.svg',
    opened: '/cats/ball/C1-4.svg',
  },
  D: {
    capsule: '/cats/ball/D1-3.svg',
    opened: '/cats/ball/D1-4.svg',
  },
} as const;

const ANIMATION_TIMING = {
  CAPSULE: 1000, // 캡슐 등장 시간
  SHAKE: 1000, // 흔들기 애니메이션 시간
  OPEN: 1000, // 열기 애니메이션 시간
} as const;

// 요약 개별 아이템 컴포넌트
const SummaryItem = memo(({ result }: { result: Avatar }) => {
  const capsuleImages =
    RARITY_TO_IMAGE[result.rarity as keyof typeof RARITY_TO_IMAGE];

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <img
        src={capsuleImages.opened}
        alt={`${result.rarity} Capsule`}
        className='h-[250px] w-[250px]'
      />
      <div className='absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-300/30 blur-xl' />
      <img
        src={`/cats/${result.name}.svg`}
        alt={result.name}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[65%] transform'
      />
      <p className='text-center text-xl font-bold'>
        {getCatKorName(result.name)}
      </p>
    </div>
  );
});

SummaryItem.displayName = 'SummaryItem';

// 전체 결과 요약 화면 컴포넌트
const SummaryView = memo(
  ({
    results,
    onBackdropClick,
  }: {
    results: Avatar[];
    onBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  }) => (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
      onClick={onBackdropClick}
    >
      <div className='relative bg-transparent'>
        <div className='grid grid-cols-5'>
          {results.map((result, index) => (
            <SummaryItem key={`${result.name}-${index}`} result={result} />
          ))}
        </div>
      </div>
    </div>
  ),
);

SummaryView.displayName = 'SummaryView';

// 가챠 결과 모달 메인 컴포넌트
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

    // 현재 표시할 결과 메모이제이션
    const currentResult = useMemo(
      () => results[currentIndex],
      [results, currentIndex],
    );

    // 다음 결과로 넘어가는 핸들러
    const handleNext = useCallback(() => {
      if (isAnimating) return;

      if (currentIndex < results.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnimationStep(ANIMATION_STEPS.INITIAL);
      } else {
        setIsSummary(true);
      }
    }, [currentIndex, results.length, isAnimating]);

    // Skip (요약 모달으로 이동)
    const handleSkip = useCallback(() => {
      setIsSummary(true);
    }, []);

    // 모달 뒷 배경 클릭 핸들러
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;

        // 애니메이션 중이면 애니메이션 완료 처리
        if (isAnimating) {
          setIsAnimating(false);
          setIsCapsuleVisible(true);
          setAnimationStep(ANIMATION_STEPS.COMPLETE);
          return;
        }

        if (!isSingleDraw && !isSummary) {
          // 다중 뽑기 중이면 다음 결과로
          if (currentIndex < results.length - 1) {
            handleNext();
          } else {
            setIsSummary(true);
          }
          return;
        }

        // 그 외의 경우 모달 닫기
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

    // 엔터키 이벤트 핸들러
    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          if (isSingleDraw) {
            // 단일 뽑기일 때
            if (isAnimating) {
              // 애니메이션 중이면 애니메이션 완료 처리
              setIsAnimating(false);
              setIsCapsuleVisible(true);
              setAnimationStep(ANIMATION_STEPS.COMPLETE);
            } else if (animationStep === ANIMATION_STEPS.COMPLETE) {
              // 결과 화면이면 모달 닫기
              onOpenChange(false);
            }
          } else {
            // 다중 뽑기일 때
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
    }, [handleNext, isSummary]);

    useEffect(() => {
      // 모달이 닫힐 때 상태 초기화
      if (!isOpen) {
        setAnimationStep(ANIMATION_STEPS.INITIAL);
        setIsCapsuleVisible(false);
        setCurrentIndex(0);
        setIsSummary(false);
        return;
      }

      let isSubscribed = true; // 컴포넌트가 살아있음을 표시

      const runAnimation = async () => {
        if (!isSubscribed) return; // 컴포넌트가 죽었으면 실행하지 않음
        setIsAnimating(true); // 애니메이션 실행

        if (isSingleDraw || currentIndex === 0) {
          setIsCapsuleVisible(true);
          setAnimationStep(ANIMATION_STEPS.CAPSULE);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.CAPSULE),
          );
          if (!isSubscribed) return; // 상태 업데이트 전에 컴포넌트가 아직 살아있는지 확인

          setAnimationStep(ANIMATION_STEPS.SHAKE);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.SHAKE),
          );
          if (!isSubscribed) return; // 상태 업데이트 전에 컴포넌트가 아직 살아있는지 확인

          setAnimationStep(ANIMATION_STEPS.OPEN);
          await new Promise(resolve =>
            setTimeout(resolve, ANIMATION_TIMING.OPEN),
          );
          if (!isSubscribed) return; // 상태 업데이트 전에 컴포넌트가 아직 살아있는지 확인
        }

        setAnimationStep(ANIMATION_STEPS.COMPLETE);
        setIsAnimating(false);
      };

      if (currentResult && !isSummary) {
        runAnimation();
      }

      return () => {
        isSubscribed = false; // 클린업 함수
      };
    }, [isOpen, currentResult, currentIndex, isSingleDraw, isSummary]);

    // 모달이 닫혀있거나 현재 결과가 없으면 null 반환
    if (!isOpen || !currentResult) return null;

    // 요약 화면이면 SummaryView 컴포넌트 반환
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
          {/* 등급 */}
          {/* <div className='absolute left-1/2 top-[-15%] -translate-x-1/2 transform'>
            <span className='text-4xl font-bold text-white'>{rarity}</span>
          </div> */}
          {/* 가챠 볼(캡슐) */}
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

          {/* 결과 표시 */}
          {isCompleteStep && (
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 transform text-center'>
              <div className='absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-300/30 blur-xl' />
              <img src={`/cats/${name}.svg`} alt={name} className='scale-150' />
              <div className='translate-y-5 text-2xl font-bold text-white'>
                {getCatKorName(name)}
              </div>
            </div>
          )}

          {/* Skip 버튼(10회 뽑기) */}
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

          {/* Enter 안내 메시지 */}
          <div className='absolute left-1/2 top-[-50px] w-full -translate-x-1/2 transform'>
            <p className='animate-pulse text-center text-base font-semibold text-white'>
              {/* {isAnimating ? 'Press Enter to skip' : 'Press Enter to continue'} */}
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
