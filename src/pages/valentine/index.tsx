import { useRef, useState } from 'react';

import { CalendarRange, Gift } from 'lucide-react';
import { toast } from 'sonner';

import Layout from '@/components/Layout';
import { FullRarity } from '@/lib/type';
import { getCatKorName } from '@/lib/utils';

import Confetti from '../gacha/components/Confetti';

const ANIMATION_TIMING = {
  ARROW: 800, // 화살 애니메이션 시간
  BOX: 400, // 박스 터지는 애니메이션 시간
  RESULT: 1200, // 전체 애니메이션 시간 (화살 + 박스)
} as const;

const VALENTINE_IMAGES = {
  CHOCOLATE: '/valentine/chocolate.png',
  GIFT_BOX: '/valentine/gift-box.png',
  ARROW: '/valentine/arrow.png',
} as const;

interface ValentineCat {
  name: string;
  grade: FullRarity;
  imageUrl: string;
}

const VALENTINE_CATS: ValentineCat[] = [
  {
    name: 'LikeCat',
    grade: 'H',
    imageUrl: '/cats/LikeCat.svg',
  },
  {
    name: 'ChocoFondueCat',
    grade: 'H',
    imageUrl: '/cats/ChocoFondueCat.svg',
  },
  {
    name: 'CupidCat',
    grade: 'H',
    imageUrl: '/cats/CupidCat.svg',
  },
];

const INITIAL_COINS = 3;

interface CatCardProps {
  cat: ValentineCat;
}

const CatCard = ({ cat }: CatCardProps) => (
  <div className='text-center'>
    <div className='rounded-lg bg-slate-900/50 p-2'>
      <img
        src={cat.imageUrl}
        alt={cat.name}
        className='mx-auto h-28 w-28 transition-transform hover:scale-110'
      />
    </div>
    <p className='mt-3 text-sm font-medium text-white'>
      {getCatKorName(cat.name)}
    </p>
    <span className='text-xs text-[#26ffc9]'>{cat.grade}등급</span>
  </div>
);

interface AnimationProps {
  isShowAnimation: boolean;
}

const Animation = ({ isShowAnimation }: AnimationProps) => {
  if (!isShowAnimation) return null;

  return (
    <div className='relative h-64 w-64'>
      <div className='absolute right-0 top-1/2 -translate-y-1/2'>
        <img
          src={VALENTINE_IMAGES.GIFT_BOX}
          alt='Gift Box'
          className='animate-box-explosion h-20 w-20'
          style={{ animationDelay: `${ANIMATION_TIMING.ARROW}ms` }}
        />
      </div>
      <div className='animate-shoot-arrow absolute left-0 top-1/2 -translate-y-1/2'>
        <img src={VALENTINE_IMAGES.ARROW} alt='Arrow' className='h-16 w-16' />
      </div>
    </div>
  );
};

interface ResultDisplayProps {
  currentCat: ValentineCat | null;
}

const ResultDisplay = ({ currentCat }: ResultDisplayProps) => {
  if (!currentCat) return null;

  return (
    <div className='text-center'>
      <div className='relative rounded-lg bg-slate-900/50 p-4'>
        <img
          src={currentCat.imageUrl}
          alt={currentCat.name}
          className='mx-auto h-48 w-48'
        />
      </div>
      <p className='mt-4 text-xl font-bold text-white'>
        {getCatKorName(currentCat.name)}
      </p>
      <p className='mt-2 text-sm text-pink-400'>새로운 고양이를 획득했어요!</p>
    </div>
  );
};

const ValentineEventPage = () => {
  const [remainingCoins, setRemainingCoins] = useState(INITIAL_COINS);
  const [isShowAnimation, setShowAnimation] = useState(false);
  const [currentCat, setCurrentCat] = useState<ValentineCat | null>(null);
  const [isShowConfetti, setShowConfetti] = useState(false);
  const isProcessingRef = useRef(false);

  const useChocoCoin = async () => {
    if (remainingCoins <= 0 || isProcessingRef.current) {
      if (remainingCoins <= 0) {
        toast.error('남은 초코 코인이 없습니다.');
      }
      return;
    }

    isProcessingRef.current = true;
    setRemainingCoins(prev => Math.max(0, prev - 1));
    setShowAnimation(true);
    setCurrentCat(null);
    setShowConfetti(false);

    const randomCat =
      VALENTINE_CATS[Math.floor(Math.random() * VALENTINE_CATS.length)];

    setTimeout(() => {
      setCurrentCat(randomCat);
      setShowAnimation(false);
      setShowConfetti(true);
      isProcessingRef.current = false;
    }, ANIMATION_TIMING.RESULT);
  };

  const renderInitialState = () => (
    <div className='flex flex-col items-center'>
      <img
        src={VALENTINE_IMAGES.CHOCOLATE}
        alt='Chocolate'
        className='h-40 w-40'
      />
      <p className='mt-4 text-sm text-gray-400'>초코 코인을 사용해보세요!</p>
    </div>
  );

  return (
    <Layout>
      <div className='mx-auto max-w-5xl p-8'>
        <div className='flex flex-col items-center text-center'>
          <span className='text-4xl font-bold text-pink-400'>
            달콤한 발렌타인 이벤트
          </span>
          <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-4 py-2'>
            <CalendarRange className='h-5 w-5 text-pink-400' />
            <span className='font-medium text-pink-400'>
              2025.02.14 - 2025.02.21
            </span>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div className='rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm'>
              <div className='mb-6 flex items-center'>
                <Gift className='mr-2 h-5 w-5 text-pink-400' />
                <span className='font-bold text-white'>특별 고양이</span>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                {VALENTINE_CATS.map(cat => (
                  <CatCard key={cat.name} cat={cat} />
                ))}
              </div>
            </div>

            <div className='rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm'>
              <div className='mb-4 flex items-center'>
                <img
                  src={VALENTINE_IMAGES.CHOCOLATE}
                  alt='Chocolate'
                  className='mr-2 h-5 w-5'
                />
                <span className='font-bold text-white'>초코 코인 혜택</span>
              </div>
              <ul className='space-y-3 text-gray-200'>
                <li>• 각 사용자에게 3개의 초코 코인 제공</li>
                <li>• 코인으로 특별한 H등급 고양이 획득 기회</li>
                <li>• 랜덤으로 3종의 고양이 중 하나 등장</li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm'>
            <div className='relative flex h-80 w-full items-center justify-center'>
              {isShowAnimation ? (
                <Animation isShowAnimation={isShowAnimation} />
              ) : currentCat ? (
                <ResultDisplay currentCat={currentCat} />
              ) : (
                renderInitialState()
              )}
            </div>

            <div className='w-full space-y-4'>
              <div className='rounded-full bg-pink-500/10 px-4 py-2 text-center text-pink-400'>
                남은 코인: {remainingCoins}개
              </div>
              <button
                onClick={useChocoCoin}
                disabled={remainingCoins <= 0 || isShowAnimation}
                className='w-full rounded-lg bg-pink-500 px-8 py-4 font-medium text-white transition-all hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50'
              >
                초코 코인 사용하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {isShowConfetti && <Confetti />}
    </Layout>
  );
};

export default ValentineEventPage;
