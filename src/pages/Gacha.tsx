import { useState } from 'react';

import Layout from '@/components/Layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import cat from '../assets/cat.svg';
import ballImageUrl from '../assets/gacha-ball.svg';
import machineImageUrl from '../assets/gacha-machine.svg';
import handleImageUrl from '../assets/handle.svg';

type Cat = {
  name: string;
  rarity: string;
  imgUrl: string;
};

const dummyCat: Cat = {
  name: 'Typescript',
  rarity: 'B',
  imgUrl: cat,
};

const generateResults = (count: number): Cat[] => {
  return Array(count).fill(dummyCat);
};

const myPoints = 100;

const RARITY_INFO = [
  { rarity: 'S', dropRate: '3' },
  { rarity: 'A', dropRate: '7' },
  { rarity: 'B', dropRate: '15' },
  { rarity: 'C', dropRate: '27' },
  { rarity: 'D', dropRate: '48' },
];

const INITIAL_BALL_POSITIONS = [
  { left: '40%', top: '40%' },
  { left: '48%', top: '35%' },
  { left: '47%', top: '45%' },
  { left: '55%', top: '40%' },
];

const Gacha = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [results, setResults] = useState<Cat[]>([]);
  const [ballPositions, setBallPositions] = useState(INITIAL_BALL_POSITIONS);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDraw, setPendingDraw] = useState<{
    count: number;
    cost: number;
  } | null>(null);

  const handleConfirmDraw = (count: number) => {
    const cost = count === 1 ? 10 : 100;
    setPendingDraw({ count, cost });
    setConfirmOpen(true);
  };

  const executeDraw = async () => {
    // 뽑기 실행
    if (!pendingDraw) return;
    await handleGachaDraw(pendingDraw.count);
    setPendingDraw(null);
  };

  const shuffleBalls = () => {
    setBallPositions(prevPositions => {
      const newPositions = [...prevPositions];
      // Fisher-Yates 셔플 알고리즘
      for (let i = newPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
      }
      return newPositions;
    });
  };

  const handleGachaDraw = async (count: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const handleElement = document.getElementById('gacha-handle');
    if (handleElement) {
      handleElement.classList.add(
        'rotate-45',
        'transition-transform',
        'duration-1000',
      );

      await new Promise(resolve => setTimeout(resolve, 500));

      for (let i = 0; i < 3; i++) {
        shuffleBalls();
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      handleElement.classList.remove('rotate-45');
      await new Promise(resolve => setTimeout(resolve, 300));

      const newResults = generateResults(count);
      setResults(newResults);
      setIsAnimating(false);

      // 1회 뽑기는 개별 모달, 10회 뽑기는 바로 전체 결과 모달
      if (count === 1) {
        setIsModalOpen(true);
      } else {
        setIsResultModalOpen(true);
      }
    }
  };

  return (
    <Layout>
      {/* Drop Rate 정보 블록 */}
      <div className='fixed right-10 top-24 w-48 rounded-lg bg-black/30 p-5 shadow-md backdrop-blur-sm'>
        <div className='mb-2 text-center text-lg font-bold text-white'>
          DROP RATE
        </div>
        {RARITY_INFO.map(({ rarity, dropRate }) => (
          <div key={rarity} className='mb-1 flex items-center gap-4'>
            <span className='font-bold text-white'>{rarity}</span>
            <span className='text-white'>{dropRate}%</span>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center'>
        <div className='container px-4'>
          <div className='mx-auto flex max-w-[600px] flex-col items-center'>
            <div className='relative w-full'>
              <img src={machineImageUrl} alt='Gacha Machine' />

              <img
                id='gacha-handle'
                src={handleImageUrl}
                alt='Handle'
                className='absolute left-1/2 top-[58%] w-[8%] -translate-x-1/2 transform'
              />

              {ballPositions.map((position, index) => (
                <img
                  key={index}
                  src={ballImageUrl}
                  alt={`Ball ${index + 1}`}
                  className={`absolute w-[9%] transform animate-bounce transition-all`}
                  style={{
                    ...position,
                    animationDelay: `${index * 0.2}s`, // 각 볼마다 0.2초씩 지연
                    animationDuration: '1s', // 전체 바운스 주기는 1초
                  }}
                />
              ))}

              <div className='absolute bottom-[22%] left-1/2 -translate-x-1/2 transform rounded bg-yellow-300 px-4 py-1 text-center'>
                <div className='text-sm'>내 포인트</div>
                <div className='font-bold'>{myPoints.toLocaleString()}</div>
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className='flex gap-2'>
              <button
                className='bg-red-500 disabled:bg-gray-400'
                onClick={() => handleConfirmDraw(1)}
                disabled={isAnimating || myPoints < 10}
              >
                <div>1회 뽑기</div>
                <div className='text-sm'>🪙 10 points</div>
              </button>

              <button
                className='bg-red-500 disabled:bg-gray-400'
                onClick={() => handleConfirmDraw(10)}
                disabled={isAnimating || myPoints < 100}
              >
                <div>10회 뽑기</div>
                <div className='text-sm'>🪙 100 points</div>
              </button>
            </div>
          </div>
        </div>
        {/* 확인 다이얼로그 */}
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>확인</AlertDialogTitle>
              <AlertDialogDescription>
                {pendingDraw &&
                  `${pendingDraw.cost} 코인을 사용해서 ${pendingDraw.count}회 뽑기를 할까요?`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={executeDraw}>확인</AlertDialogAction>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* 개별 결과 모달 (1회 뽑기용) */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            {results[0] && (
              <div className='text-center'>
                <DialogHeader>
                  <DialogTitle>
                    <div className='relative h-14'>
                      <div className='absolute left-0 top-0 text-5xl text-gray-600'>
                        {results[0].rarity}
                      </div>
                      <div className='absolute left-1/2 top-6 -translate-x-1/2 transform text-2xl font-bold'>
                        {results[0].name} 고양이
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <img
                  src={results[0].imgUrl}
                  alt={results[0].name}
                  className='mx-auto w-[70%]'
                />
              </div>
            )}
            <DialogDescription className='text-center'>
              5초 뒤 창이 자동으로 닫힙니다.
            </DialogDescription>
          </DialogContent>
        </Dialog>

        {/* 전체 결과 모달 (10회 뽑기용) */}
        <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
          <DialogContent className='max-w-3xl'>
            <DialogHeader>
              <DialogTitle>{results.length}회 뽑기 결과</DialogTitle>
            </DialogHeader>
            <div className='grid grid-cols-5 gap-4 p-4'>
              {results.map((cat, index) => (
                <div key={index} className='text-center'>
                  <img src={cat.imgUrl} alt={cat.name} className='mx-auto' />
                  <div className='mt-2 flex content-center justify-center gap-3'>
                    <div className='font-bold'>{cat.rarity}</div>
                    <div className='text-sm'>{cat.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gacha;
