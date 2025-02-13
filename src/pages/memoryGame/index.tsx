import { useEffect, useState } from 'react';

import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import Layout from '@/components/Layout';
import { CAT_MAPPINGS } from '@/constant/catMapping';
import { cn } from '@/lib/utils';

const ALL_CATS = Object.entries(CAT_MAPPINGS).map(([id, info]) => ({
  id,
  ...info,
}));

interface Card {
  id: number;
  catId: string;
  name: string;
}

type GameStatus = 'ready' | 'countdown' | 'playing' | 'complete';

const MemoryGame = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [countdown, setCountdown] = useState(3);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isFading, setIsFading] = useState<string[]>([]);
  const [isPointAvailable, setIsPointAvailable] = useState(false);

  const initializeGame = () => {
    const selectedCats = [...ALL_CATS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const gameCards = [...selectedCats, ...selectedCats]
      .map((cat, index) => ({
        id: index,
        catId: cat.id,
        name: cat.korName,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setIsFading([]);
    setIsChecking(false);
    setIsPointAvailable(false);
  };

  const startCountdown = () => {
    setGameStatus('countdown');
    setCountdown(3);
    initializeGame();
  };

  useEffect(() => {
    if (gameStatus === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (gameStatus === 'countdown' && countdown === 0) {
      setGameStatus('playing');
    }
  }, [countdown, gameStatus]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].catId) ||
      isFading.includes(cards[index].catId) ||
      isChecking ||
      flippedIndices.length === 2
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsChecking(true);
      checkMatch(newFlippedIndices);
    }
  };

  const checkMatch = (indices: number[]) => {
    const [firstIndex, secondIndex] = indices;

    if (cards[firstIndex].catId === cards[secondIndex].catId) {
      const matchedCardId = cards[firstIndex].catId;

      setTimeout(() => {
        setIsFading(prev => [...prev, matchedCardId]);

        setTimeout(() => {
          const newMatchedPairs = [...matchedPairs, matchedCardId];
          setMatchedPairs(newMatchedPairs);
          setFlippedIndices([]);
          setIsChecking(false);

          if (newMatchedPairs.length === 6) {
            setGameStatus('complete');
            setIsPointAvailable(Math.random() < 0.9);
          }
        }, 50);
      }, 500);
    } else {
      setTimeout(() => {
        setFlippedIndices([]);
        setIsChecking(false);
      }, 800);
    }
  };

  const handleGetPoint = () => {
    toast('10 포인트를 획득했습니다.');
    setGameStatus('ready');
    setIsPointAvailable(false);
  };

  const renderCard = (card: Card, index: number) => {
    const isFlipped = flippedIndices.includes(index);
    const isMatched = matchedPairs.includes(card.catId);
    const isCardFading = isFading.includes(card.catId);

    return (
      <div key={card.id} className='aspect-square'>
        <div
          onClick={() => handleCardClick(index)}
          className={cn(
            'relative h-full w-full transform-gpu cursor-pointer',
            'transition-all duration-200 ease-in-out',
            '[transform-style:preserve-3d]',
            'hover:scale-102',
            {
              '[transform:rotateY(180deg)]':
                isFlipped || isMatched || isCardFading,
            },
            { 'animate-fade-out': isCardFading },
            { 'pointer-events-none': isCardFading },
          )}
        >
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'rounded-xl bg-white/90',
              '[backface-visibility:hidden]',
              'bg-cover bg-center shadow-md',
              'border-2 border-white/20',
            )}
            style={{ backgroundImage: 'url("/solve-nyang-bg.png")' }}
          >
            <span className='text-6xl font-bold text-yellow-400 drop-shadow-lg'>
              ?
            </span>
          </div>

          <div
            className={cn(
              'absolute inset-0 p-3',
              'rounded-xl bg-white/95',
              '[backface-visibility:hidden]',
              '[transform:rotateY(180deg)]',
              'bg-cover bg-center shadow-md',
              'border-2 border-white/20',
            )}
            style={{ backgroundImage: 'url("/solve-nyang-bg.png")' }}
          >
            <div className='flex h-full items-center justify-center rounded-lg p-1'>
              <img
                src={`/cats/${card.catId}.svg`}
                alt={card.name}
                className='h-5/6 w-5/6 object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (gameStatus) {
      case 'ready':
        return (
          <div className='text-center'>
            <button
              onClick={startCountdown}
              className='rounded-xl bg-yellow-400 px-6 py-3 font-bold text-gray-900 shadow-lg transition-all hover:scale-105 hover:bg-yellow-300'
            >
              게임 시작하기
            </button>
          </div>
        );
      case 'countdown':
        return (
          <div className='text-center'>
            <span className='text-8xl font-bold text-yellow-400 drop-shadow-lg'>
              {countdown}
            </span>
          </div>
        );
      case 'playing':
        return (
          <div className='w-full max-w-2xl px-4'>
            <div className='grid grid-cols-4 gap-6'>
              {cards.map((card, index) => renderCard(card, index))}
            </div>
          </div>
        );
      case 'complete':
        return (
          <div className='text-center'>
            <h2 className='mb-4 text-3xl font-bold text-yellow-400 drop-shadow-lg'>
              게임 클리어!
            </h2>
            {isPointAvailable ? (
              <div className='mb-6 space-y-4'>
                <p className='text-lg text-white'>
                  운이 좋네요! 포인트를 획득할 수 있어요!
                </p>
                <button
                  onClick={handleGetPoint}
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-gray-900 shadow-lg transition-all hover:scale-105 hover:bg-yellow-300'
                >
                  <Sparkles className='h-5 w-5' />
                  포인트 획득하기
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                <button
                  onClick={() => setGameStatus('ready')}
                  className='rounded-xl bg-gray-100 px-6 py-3 font-bold text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-200'
                >
                  한 판 더 하기
                </button>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className='container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-8'>
        <h1 className='text-4xl font-bold text-white drop-shadow-lg'>
          냥냥 메모리 게임
        </h1>
        {renderContent()}
      </div>
    </Layout>
  );
};

export default MemoryGame;
