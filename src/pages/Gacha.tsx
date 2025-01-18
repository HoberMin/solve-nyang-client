import { useState } from 'react';

import { Character, useGachaCharacterApi } from '@/apis/character';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { GachaConfirmDialog } from '@/components/gacha/GachaConfirmDialog';
import { GachaDropRateInfo } from '@/components/gacha/GachaDropRateInfo';
import { GachaResultModal } from '@/components/gacha/GachaResultModal';
import { queryClient } from '@/lib/queryClient';
import { BallPosition, DrawConfig } from '@/types/gacha';

import ballImageUrl from '../assets/gacha-ball.svg';
import machineImageUrl from '../assets/gacha-machine.svg';
import handleImageUrl from '../assets/handle.svg';

const INITIAL_BALL_POSITIONS: BallPosition[] = [
  { left: '40%', top: '40%' },
  { left: '48%', top: '35%' },
  { left: '47%', top: '45%' },
  { left: '55%', top: '40%' },
];

const Gacha = () => {
  const getGacha = useGachaCharacterApi();

  // 포인트 조회
  const { data } = useGetUserInfo();
  const { point } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ballPositions, setBallPositions] = useState(INITIAL_BALL_POSITIONS);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDraw, setPendingDraw] = useState<DrawConfig | null>(null);
  const [gachaResults, setGachaResults] = useState<Character[]>([]);
  const [drawMode, setDrawMode] = useState<'single' | 'multi' | null>(null);

  const handleConfirmDraw = (count: number) => {
    const cost = count === 1 ? 10 : 100;
    setPendingDraw({ count, cost });
    setDrawMode(count === 1 ? 'single' : 'multi');
    setIsConfirmOpen(true);
  };

  const shuffleBalls = () => {
    setBallPositions(prevPositions => {
      const newPositions = [...prevPositions];
      for (let i = newPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
      }
      return newPositions;
    });
  };

  const handleGachaDraw = async () => {
    if (!pendingDraw || isAnimating) return;

    setIsAnimating(true);
    const handleElement = document.getElementById('gacha-handle');

    try {
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

        const { avatars } = await getGacha(pendingDraw.count);
        setGachaResults(avatars);
        setIsModalOpen(true);

        queryClient.invalidateQueries({ queryKey: ['userInfo'] }); // 쿼리 무효화
      }
    } catch (error) {
      console.error('Gacha draw error:', error);
      setDrawMode(null);
    } finally {
      setIsAnimating(false);
      setPendingDraw(null);
    }
  };

  return (
    <Layout>
      <GachaDropRateInfo />

      <div className='flex items-center justify-center'>
        <div className='container px-4'>
          <div className='mx-auto flex max-w-[50%] flex-col items-center'>
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
                  className='absolute w-[9%] transform animate-bounce transition-all'
                  style={{
                    ...position,
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}

              <div className='absolute bottom-[22%] left-1/2 -translate-x-1/2 transform rounded bg-yellow-300 px-4 py-1 text-center'>
                <div className='text-sm'>내 포인트</div>
                <div className='font-bold'>{point.toLocaleString()}</div>
              </div>
            </div>

            <div className='flex gap-2'>
              <button
                className='bg-red-500 disabled:bg-gray-400'
                onClick={() => handleConfirmDraw(1)}
                disabled={isAnimating || point < 10}
              >
                <div>1회 뽑기</div>
                <div className='text-sm'>🪙 10 points</div>
              </button>

              <button
                className='bg-red-500 disabled:bg-gray-400'
                onClick={() => handleConfirmDraw(10)}
                disabled={isAnimating || point < 100}
              >
                <div>10회 뽑기</div>
                <div className='text-sm'>🪙 100 points</div>
              </button>
            </div>
          </div>
        </div>

        <GachaConfirmDialog
          isOpen={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          pendingDraw={pendingDraw}
          onConfirm={handleGachaDraw}
        />
        <GachaResultModal
          isOpen={isModalOpen}
          onOpenChange={open => {
            setIsModalOpen(open);
            if (!open) setDrawMode(null);
          }}
          results={gachaResults}
          isSingleDraw={drawMode === 'single'}
        />
      </div>
    </Layout>
  );
};

export default Gacha;
