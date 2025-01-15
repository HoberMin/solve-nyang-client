import React, { useState } from 'react';

import Layout from '@/components/Layout';
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

// 가챠 볼의 위치 설정을 객체 배열로 관리
const BALL_POSITIONS = [
  { left: '35%', top: '40%' },
  { left: '55%', top: '35%' },
  { left: '45%', top: '45%' },
  { left: '58%', top: '45%' },
];

const dummyCat: Cat = {
  name: '식빵 고양이',
  rarity: 'B',
  imgUrl: cat,
};

// 뽑기 결과를 생성하는 함수
const generateResults = (count: number): Cat[] => {
  return Array(count).fill(dummyCat);
};

const Gacha = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [results, setResults] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSequential, setIsSequential] = useState(false);

  const handleGachaDraw = async (count: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    // 핸들 회전 애니메이션 실행
    const handleElement = document.getElementById('gacha-handle');
    if (handleElement) {
      handleElement.classList.add(
        'rotate-45',
        'transition-transform',
        'duration-1000',
      );

      // 애니메이션 완료 후 상태 초기화 및 모달 표시
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleElement.classList.remove('rotate-45');

      const newResults = generateResults(count);
      setResults(newResults);
      setIsAnimating(false);

      if (count === 1) {
        setIsModalOpen(true);
      } else {
        setCurrentIndex(0);
        setIsSequential(true);
        setIsModalOpen(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsModalOpen(false);
      setIsResultModalOpen(true);
    }
  };

  const handleSkip = () => {
    setIsModalOpen(false);
    setIsResultModalOpen(true);
  };

  return (
    <Layout>
      <div className='min-h-screen'>
        <div className='container mx-auto mt-8 flex justify-center px-4'>
          <div className='flex w-[700px] flex-col items-center'>
            <div className='relative'>
              {/* 가챠머신 */}
              <img
                src={machineImageUrl}
                alt='Gacha Machine'
                className='w-full'
              />

              {/* 가챠 핸들 */}
              <img
                id='gacha-handle'
                src={handleImageUrl}
                alt='Handle'
                className='absolute left-1/2 top-[58%] w-16 -translate-x-1/2 transform'
              />

              {/* 가챠 볼 */}
              {BALL_POSITIONS.map((position, index) => (
                <img
                  key={index}
                  src={ballImageUrl}
                  alt={`Ball ${index + 1}`}
                  className='absolute w-16 transform animate-bounce'
                  style={position}
                />
              ))}

              {/* 포인트 표시 */}
              <div className='absolute bottom-[22%] left-1/2 -translate-x-1/2 transform rounded bg-yellow-300 px-4 py-1 text-center'>
                보유 포인트
                <div className='font-bold'>70,300</div>
              </div>
            </div>

            {/* 뽑기 버튼 */}
            <div className='mt-4 space-y-2'>
              <button
                className='w-full rounded bg-red-500 px-8 py-2 text-white disabled:opacity-50'
                onClick={() => handleGachaDraw(1)}
                disabled={isAnimating}
              >
                <div>1회 뽑기</div>
                <div className='text-sm'>🪙 10 points</div>
              </button>

              <button
                className='w-full rounded bg-gray-300 px-8 py-2 text-black disabled:opacity-50'
                onClick={() => handleGachaDraw(10)}
                disabled={isAnimating}
              >
                <div>10회 뽑기</div>
                <div className='text-sm'>🪙 100 points</div>
              </button>
            </div>

            {/* 개별 결과 모달 */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent>
                {results[currentIndex] && (
                  <div className='text-center'>
                    <DialogHeader>
                      <DialogTitle>
                        <div className='relative h-14'>
                          <div className='absolute left-0 top-0 text-5xl text-gray-600'>
                            {results[currentIndex].rarity}
                          </div>
                          <div className='absolute left-1/2 top-6 -translate-x-1/2 transform text-3xl font-bold'>
                            {results[currentIndex].name}
                          </div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <img
                      src={results[currentIndex].imgUrl}
                      alt={results[currentIndex].name}
                      className='mx-auto'
                    />
                  </div>
                )}

                {isSequential && (
                  <DialogFooter className='flex justify-between'>
                    <button
                      onClick={handleNext}
                      className='rounded bg-blue-500 px-4 py-2 text-white'
                    >
                      Next
                    </button>
                    <button
                      onClick={handleSkip}
                      className='rounded bg-gray-300 px-4 py-2 text-black'
                    >
                      Skip
                    </button>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>

            {/* 최종 결과 모달 */}
            <Dialog
              open={isResultModalOpen}
              onOpenChange={setIsResultModalOpen}
            >
              <DialogContent className='max-w-3xl'>
                <DialogHeader>
                  <DialogTitle>전체 결과 ({results.length}개)</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-5 gap-4 p-4'>
                  {results.map((cat, index) => (
                    <div key={index} className='text-center'>
                      <img
                        src={cat.imgUrl}
                        alt={cat.name}
                        className='mx-auto'
                      />
                      <div className='mt-2 font-bold'>{cat.name}</div>
                      <div className='text-sm text-gray-600'>
                        등급: {cat.rarity}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gacha;
