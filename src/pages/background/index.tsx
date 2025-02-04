// BackgroundCard.tsx
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Background,
  useBuyBackgroundImage,
  useGetBackgroundImage,
} from '@/apis/background';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PointDisplay } from '../gacha/components/PointDisplay';
import { getKoreanName } from './constant';

interface BackgroundCardProps {
  background: Background;
  userPoint: number;
  onPurchase: (name: string) => void;
}

export const BackgroundCard = ({
  background,
  userPoint,
  onPurchase,
}: BackgroundCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const isPurchase = userPoint >= background.price;
  const buyBackground = useBuyBackgroundImage();

  const handlePurchase = (backgroundId: string) => {
    buyBackground(backgroundId);
    onPurchase(background.name);
    setIsDialogOpen(false);
    setIsConfirmed(false);
  };

  return (
    <div className='relative w-full rounded-lg bg-white/5 p-4 backdrop-blur-sm'>
      <div className='aspect-[2/1] w-full overflow-hidden rounded-lg'>
        <img
          src={`/bg/${background.name}.svg`}
          alt={background.name}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <h3 className='text-lg font-bold capitalize text-white'>
          {getKoreanName(background.name)}
        </h3>
        <div className='flex items-center gap-2'>
          <img src='/assets/coin.svg' alt='coin' className='w-6' />
          <span className='text-white'>
            {background.price.toLocaleString()}냥 코인
          </span>
        </div>
      </div>
      {!background.owned && (
        <Button
          className='mt-4 w-full border border-blue-400 bg-blue-400/10 text-blue-400 transition-colors hover:bg-blue-400 hover:text-gray-900 disabled:border-gray-700 disabled:bg-gray-800/50 disabled:text-gray-400'
          onClick={() => setIsDialogOpen(true)}
          disabled={!isPurchase}
        >
          구매하기
        </Button>
      )}
      {background.owned && (
        <div className='mt-4 text-center text-green-400'>보유중</div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='border-gray-600 bg-gray-900'>
          <DialogHeader>
            <DialogTitle className='text-xl text-blue-400'>
              배경 구매 확인
            </DialogTitle>
            <DialogDescription className='space-y-4 text-base text-gray-400'>
              <p>
                {getKoreanName(background.name)} 배경의 가격은
                {background.price.toLocaleString()}냥 입니다.
              </p>
              <p>정말로 구매하시겠습니까?</p>

              <div className='rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-400'>
                <p className='font-medium'>⚠️ 주의!</p>
                <p className='mt-2'>한번 구매하면 환불할 수 없습니다.</p>
                <p>구매한 배경은 영구적으로 소장됩니다.</p>
              </div>

              <div className='flex items-center space-x-3 rounded-lg bg-gray-800/50 p-4'>
                <Checkbox
                  id='confirm'
                  checked={isConfirmed}
                  onCheckedChange={checked =>
                    setIsConfirmed(checked as boolean)
                  }
                  className='m-0 rounded p-0'
                ></Checkbox>
                <label htmlFor='confirm' className='text-sm text-gray-300'>
                  위 내용을 확인하였으며, 구매에 동의합니다.
                </label>
              </div>

              <span className='block text-lg text-blue-400'>
                차감 냥코인: {background.price.toLocaleString()}P
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-4 pt-4'>
            <button
              onClick={() => setIsDialogOpen(false)}
              className='cursor-pointer px-4 py-2 text-base text-red-400 transition-colors hover:text-red-300'
            >
              취소
            </button>
            <button
              onClick={() => handlePurchase(background.id)}
              disabled={!isConfirmed}
              className='bg-blue-400 px-6 py-2 text-base font-medium text-gray-900 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-700'
            >
              구매하기
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const BackgroundShop = () => {
  const { data: userData, isPending } = useGetUserInfo();
  const navigate = useNavigate();
  const userPoint = userData?.point ?? 0;

  const { data } = useGetBackgroundImage();
  const { backgrounds } = data;

  useEffect(() => {
    if (!isPending && (!userData || !userData.username)) {
      toast.error('로그인이 필요한 서비스입니다.', {
        description: '로그인 페이지로 이동합니다.',
        action: {
          label: '확인',
          onClick: () => navigate('/login'),
        },
      });
      navigate('/login');
    }
  }, [userData, isPending, navigate, userPoint]);

  const handlePurchase = (name: string) => {
    const background = backgrounds?.find(bg => bg.name === name);
    if (background && userPoint >= background.price) {
      // 실제 로직 추가
    }
  };

  return (
    <Layout>
      <div className='mx-auto max-w-7xl px-4 py-12'>
        <div className='absolute right-8 top-20'>
          <PointDisplay point={userPoint} />
        </div>
        <h1 className='mb-12 text-3xl font-bold text-white'>배경 상점</h1>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          {backgrounds?.map(background => (
            <BackgroundCard
              key={background.name}
              background={background}
              userPoint={userPoint}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BackgroundShop;
