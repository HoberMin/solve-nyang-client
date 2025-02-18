import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { CAT_MAPPINGS } from '@/constant/catMapping';
import { cn } from '@/lib/utils';

interface CatInfo {
  id: string;
  korName: string;
  engName: string;
}

interface GameResult {
  catId: string;
  korName: string;
  isCorrect: boolean;
  userAnswer?: string;
}

const ALL_CATS = Object.entries(CAT_MAPPINGS).map(([id, info]) => ({
  id,
  ...info,
}));

type GameStatus = 'ready' | 'countdown' | 'playing' | 'complete';

const CatNameGame = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [countdown, setCountdown] = useState(3);
  const [round, setRound] = useState(1);
  const [selectedCats, setSelectedCats] = useState<CatInfo[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [answerFeedback, setAnswerFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);

  const initializeGame = () => {
    const newSelectedCats = [...ALL_CATS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setSelectedCats(newSelectedCats);
    setRound(1);
    setCurrentAnswer('');
    setGameResults([]);
    setAnswerFeedback(null);
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

  const processAnswer = () => {
    const currentCat = selectedCats[round - 1];
    const isCorrect = currentAnswer.trim() === currentCat.korName;

    setAnswerFeedback({
      isCorrect,
      message: isCorrect
        ? '정답입니다!'
        : `정답은 '${currentCat.korName}' 입니다`,
    });

    setTimeout(
      () => {
        setAnswerFeedback(null);
        if (round === 5 && isCorrect) {
          setGameStatus('complete');
        }
      },
      isCorrect ? 1000 : 1500,
    );

    setGameResults(prev => [
      ...prev,
      {
        catId: currentCat.id,
        korName: currentCat.korName,
        isCorrect,
        userAnswer: currentAnswer.trim(),
      },
    ]);

    if (round < 5) {
      setRound(prev => prev + 1);
      setCurrentAnswer('');
    } else if (!isCorrect) {
      setGameStatus('complete');
    }
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    processAnswer();
  };

  const getGameSummary = () => {
    const correctCount = gameResults.filter(result => result.isCorrect).length;
    const incorrectCount = gameResults.filter(
      result => !result.isCorrect,
    ).length;

    return { correctCount, incorrectCount };
  };

  const renderContent = () => {
    if (gameStatus === 'ready') {
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
    }

    if (gameStatus === 'countdown') {
      return (
        <div className='text-center'>
          <span className='text-8xl font-bold text-yellow-400 drop-shadow-lg'>
            {countdown}
          </span>
        </div>
      );
    }

    if (gameStatus === 'complete') {
      const { correctCount, incorrectCount } = getGameSummary();

      return (
        <div className='space-y-6 text-center'>
          <h2 className='text-3xl font-bold text-yellow-400 drop-shadow-lg'>
            게임 종료!
          </h2>
          <div className='space-y-2'>
            <p className='text-lg text-white'>맞춘 문제: {correctCount}개</p>
            <p className='text-lg text-white'>틀린 문제: {incorrectCount}개</p>
          </div>
          <div className='mx-auto max-w-md space-y-4 rounded-lg bg-white/10 p-4'>
            <h3 className='text-lg font-bold text-white'>문제 상세</h3>
            {gameResults.map((result, index) => (
              <div
                key={index}
                className={cn(
                  'rounded p-2 text-sm',
                  result.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20',
                )}
              >
                <p className='text-white'>
                  {index + 1}번: {result.korName}
                  {!result.isCorrect && ` (입력: ${result.userAnswer})`}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setGameStatus('ready');
              initializeGame();
            }}
            className='rounded-xl bg-gray-100 px-6 py-3 font-bold text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-200'
          >
            다시 시작하기
          </button>
        </div>
      );
    }

    return (
      <div className='w-full max-w-md space-y-6'>
        <div className='space-y-4 text-center'>
          <span className='text-xl font-bold text-white'>라운드 {round}/5</span>
          {answerFeedback && (
            <div
              className={cn(
                'w-full rounded-lg px-4 py-2 text-center font-bold shadow-lg',
                answerFeedback.isCorrect ? 'bg-green-500' : 'bg-red-500',
              )}
            >
              {answerFeedback.message}
            </div>
          )}
        </div>

        <div className='relative mx-auto w-64'>
          <div className='aspect-square'>
            <div
              className={cn(
                'relative h-full w-full',
                'rounded-xl shadow-lg',
                'bg-white/90',
                'border-2 border-white/20',
              )}
            >
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: 'url("/solve-nyang-bg.png")' }}
              />
              <div className='relative flex h-full items-center justify-center p-4'>
                <img
                  src={`/cats/${selectedCats[round - 1]?.id}.svg`}
                  alt='고양이'
                  className='h-4/5 w-4/5 object-contain'
                />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={checkAnswer} className='space-y-4'>
          <Input
            maxLength={20}
            onPaste={e => e.preventDefault()}
            onCopy={e => e.preventDefault()}
            onCut={e => e.preventDefault()}
            onChange={e => {
              if (e.target.value.length <= 20) {
                setCurrentAnswer(e.target.value);
              }
            }}
            type='text'
            value={currentAnswer}
            placeholder='고양이의 이름을 입력하세요'
            className='border-white/50 bg-transparent text-lg text-white placeholder:text-gray-300'
            autoComplete='off'
          />
          <button
            type='submit'
            className='w-full rounded-xl bg-yellow-400 px-6 py-3 font-bold text-gray-900 shadow-lg transition-all hover:scale-105 hover:bg-yellow-300'
          >
            정답 제출
          </button>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div className='container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 py-8'>
        <h1 className='text-4xl font-bold text-white drop-shadow-lg'>
          냥냥핑 이름맞추기
        </h1>
        {renderContent()}
      </div>
    </Layout>
  );
};

export default CatNameGame;
