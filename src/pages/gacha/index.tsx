import { useEffect, useRef, useState } from 'react';

import { Button } from 'nes-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, useGachaAvatarApi } from '@/apis/avatar';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import RetroLoading from '@/components/RetroLoading';
import { queryClient } from '@/lib/queryClient';
import { GachaConfirmDialog } from '@/pages/gacha/components/GachaConfirmDialog';
import { GachaDropRateInfo } from '@/pages/gacha/components/GachaDropRateInfo';
import { GachaResultModal } from '@/pages/gacha/components/GachaResultModal';
import { PointDisplay } from '@/pages/gacha/components/PointDisplay';

import greenBallImageUrl from '/assets/gacha-ball-1.svg';
import orangeBallImageUrl from '/assets/gacha-ball-2.svg';
import skyblueBallImageUrl from '/assets/gacha-ball-3.svg';
import purpleBallImageUrl from '/assets/gacha-ball-4.svg';
import pinkBallImageUrl from '/assets/gacha-ball-5.svg';
import blueBallImageUrl from '/assets/gacha-ball-6.svg';
import yellowBallImageUrl from '/assets/gacha-ball-7.svg';
import machineImageUrl from '/assets/gacha-machine.svg';
import handleImageUrl from '/assets/handle.svg';
import coinImg from '/coin.svg';

interface BallPosition {
  left: string;
  top: string;
}

interface DrawConfig {
  count: number;
  cost: number;
}

const BALL_IMAGES = [
  greenBallImageUrl,
  orangeBallImageUrl,
  skyblueBallImageUrl,
  purpleBallImageUrl,
  pinkBallImageUrl,
  blueBallImageUrl,
  yellowBallImageUrl,
];

const INITIAL_BALL_POSITIONS: BallPosition[] = Array.from(
  { length: 7 },
  (_, index) => {
    const angle = index * ((2 * Math.PI) / 7);
    const radius = 15;

    return {
      left: `${Math.cos(angle) * radius}%`,
      top: `${(Math.sin(angle) * radius) / 2 + 7}%`,
    };
  },
);

const Gacha = () => {
  const navigate = useNavigate();
  const getGacha = useGachaAvatarApi();
  const { data: userData, isPending } = useGetUserInfo();
  const rotationRef = useRef<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ballPositions, setBallPositions] = useState<BallPosition[]>(
    INITIAL_BALL_POSITIONS,
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDraw, setPendingDraw] = useState<DrawConfig | null>(null);
  const [gachaResults, setGachaResults] = useState<Avatar[]>([]);
  const [drawMode, setDrawMode] = useState<'single' | 'multi' | null>(null);

  useEffect(() => {
    if (!isPending && !userData?.username) {
      const timer = setTimeout(() => {
        toast.error('로그인이 필요한 서비스입니다.', {
          description: '로그인 페이지로 이동합니다.',
          action: {
            label: '확인',
            onClick: () => {},
          },
        });
        navigate('/login');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [userData, isPending, navigate]);

  if (isPending) {
    return <RetroLoading />;
  }

  if (!userData?.username) {
    return null;
  }

  const { point } = userData;

  const handleConfirmDraw = (count: number) => {
    if (isAnimating) return;

    const cost = count === 1 ? 100 : 1000;
    setPendingDraw({ count, cost });
    setDrawMode(count === 1 ? 'single' : 'multi');
    setIsConfirmOpen(true);
  };

  const shuffleBalls = () => {
    rotationRef.current += Math.PI / 2;

    setBallPositions(prevPositions => {
      return prevPositions.map((_, index) => {
        const angle = rotationRef.current + index * ((2 * Math.PI) / 7);
        const radius = 15;

        return {
          left: `${Math.cos(angle) * radius}%`,
          top: `${(Math.sin(angle) * radius) / 2 + 7}%`,
        };
      });
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
        shuffleBalls();
        await new Promise(resolve => setTimeout(resolve, 1000));
        handleElement.classList.remove('rotate-45');
        await new Promise(resolve => setTimeout(resolve, 300));

        const { avatars } = await getGacha(pendingDraw.count);
        setGachaResults(avatars);
        setIsModalOpen(true);
        await queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      }
    } catch (error) {
      console.error('Gacha draw error:', error);
      setDrawMode(null);
      setPendingDraw(null);
      setIsConfirmOpen(false);
      toast.error('뽑기에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <Layout>
      <div className='fixed right-20 top-24 flex items-start gap-2'>
        <PointDisplay point={point} />
        <GachaDropRateInfo />
      </div>

      <div className='mt-[30px] flex items-center justify-center'>
        <div className='px-4'>
          <div className='mx-auto flex max-w-[35%] flex-col items-center'>
            <div className='relative w-full'>
              <img
                src={machineImageUrl}
                alt='Gacha Machine'
                className='w-full'
              />

              <img
                id='gacha-handle'
                src={handleImageUrl}
                alt='Handle'
                className='absolute right-[12%] top-[67%] w-[27%] -translate-x-1/2 transform'
              />

              {ballPositions.map((position, index) => (
                <img
                  key={index}
                  src={BALL_IMAGES[index]}
                  alt={`Ball ${index + 1}`}
                  className='absolute transform animate-low-bounce transition-all duration-1000 ease-in-out'
                  style={{
                    ...position,
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>

            <div className='relative z-50 mt-4 flex gap-2'>
              <Button
                onClick={() => handleConfirmDraw(1)}
                disabled={isAnimating || point < 100}
              >
                <div className='text-xl font-bold'>ㅤ 1회 뽑기 ㅤ</div>
                <div className='flex items-center justify-center gap-1'>
                  <img src={coinImg} alt='coin' className='w-8' />
                  <div className='text-lg'>100</div>
                </div>
              </Button>
              <Button
                // color='primary'
                onClick={() => handleConfirmDraw(10)}
                disabled={isAnimating || point < 1000}
              >
                <div className='text-xl font-bold'>ㅤ10회 뽑기ㅤ</div>
                <div className='flex items-center justify-center gap-1'>
                  <img src={coinImg} alt='coin' className='w-8' />
                  <div className='text-lg'>1000</div>
                </div>
              </Button>
            </div>
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
          if (!open) {
            setDrawMode(null);
            setPendingDraw(null);
            setGachaResults([]);
          }
        }}
        results={gachaResults}
        isSingleDraw={drawMode === 'single'}
      />
    </Layout>
  );
};

export default Gacha;
