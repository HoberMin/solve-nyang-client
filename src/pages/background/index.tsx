import { useGetBackgroundImage } from '@/apis/background';
import Layout from '@/components/Layout';

import PointDisplay from '../gacha/components/PointDisplay';
import { BackgroundCard } from './components/BackgroundCard';

const BackgroundShop = () => {
  const { data } = useGetBackgroundImage();
  const { backgrounds } = data;

  return (
    <Layout>
      <div className='relative mx-auto mb-8 flex h-full w-full max-w-7xl flex-col'>
        <div className='sticky top-0 z-10 flex bg-gray-900/95 px-6 py-4 backdrop-blur-sm'>
          <div className='flex-1'>
            <div className='mb-2 mt-8 text-2xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              배경 상점
            </div>
            <p className='text-lg text-gray-400'>
              냥코인으로 배경 이미지를 구매하여 나만의 이미지를 개성있게
              꾸며보세요.
            </p>
            <p className='mt-5 text-base text-gray-400'>
              * 구매 후 환불이나 유저 간 거래는 불가합니다.
            </p>
          </div>
          <div className='my-8'>
            <PointDisplay />
          </div>
        </div>
        <div className='mx-auto max-w-7xl px-4 py-12'>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
            {backgrounds?.map(background => (
              <BackgroundCard key={background.name} background={background} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BackgroundShop;
