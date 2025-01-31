import { useNavigate } from 'react-router-dom';

import { useGetEventAvatar, useGetEventParticipant } from '@/apis/event';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EventPage = () => {
  const navigate = useNavigate();
  const getEventAvatar = useGetEventAvatar();
  const { data: userInfo } = useGetUserInfo();
  const { data: eventParticipant } = useGetEventParticipant();

  const isAuthenticated = Boolean(userInfo?.username);
  const { hasEventAvatar } = eventParticipant || {};

  const handleReceiveGift = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await getEventAvatar();
  };

  return (
    <Layout>
      <div className='flex items-center justify-center'>
        <div className='mx-auto max-w-4xl px-4 py-8 pt-20'>
          <div className='flex flex-col items-center space-y-2'>
            <h1 className='text-3xl font-bold text-blue-400'>
              솔브냥의 설날 이벤트 🎊
            </h1>
            <p className='text-xl font-medium text-blue-200'>
              다들 새해복 많이 받으세요!
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='flex flex-col items-center justify-center gap-10 p-6'>
              <h2 className='mb-4 text-xl font-bold text-blue-300'>
                이벤트 안내
              </h2>
              <div className='flex flex-col gap-4 space-y-4 text-left'>
                <p className='text-base leading-loose text-blue-200'>
                  2025년 설날을 맞이하여 특별한 새해복냥 이벤트를 준비했습니다!
                  <br />
                  새해복냥은 특별 제작된 한정판 캐릭터로, 설날 기간 동안에만
                  받을 수 있습니다.
                </p>
                <ul className='space-y-2 text-base text-blue-200'>
                  <li className='flex items-center gap-2'>
                    <span className='text-blue-400'>•</span>
                    이벤트 기간: 2024.01.31 ~ 2024.02.04
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='text-blue-400'>•</span>
                    지급 아이템: 새해복냥 (H 등급)
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='text-blue-400'>•</span>
                    이벤트 종료 후에는 더 이상 획득할 수 없습니다
                  </li>
                </ul>
              </div>
            </div>

            <div className='flex flex-col justify-center space-y-4'>
              <div className='mx-auto aspect-square w-[70%] overflow-hidden rounded-xl p-4'>
                <img
                  src='/cats/NewYearLuckCat.svg'
                  alt='새해복냥'
                  className='h-full w-full object-contain'
                />
              </div>
              <div className='space-y-3'>
                {!isAuthenticated && (
                  <div className='rounded-lg bg-blue-500/10 p-3 text-base text-blue-300'>
                    ℹ️ 로그인하시면 새해복냥을 받을 수 있어요!
                  </div>
                )}
                {isAuthenticated && (
                  <div className='rounded-lg bg-amber-500/10 p-3 text-base text-amber-300'>
                    ⚠️ 계정당 1회만 참여 가능합니다
                  </div>
                )}
                <Button
                  onClick={handleReceiveGift}
                  disabled={isAuthenticated && hasEventAvatar}
                  className={cn(
                    'h-auto w-full px-6 py-3 text-base font-medium',
                    'bg-blue-500 hover:bg-blue-600',
                    'disabled:bg-gray-600',
                    'transition-colors',
                  )}
                >
                  {!isAuthenticated && '로그인하고 새해복냥 받기'}
                  {isAuthenticated &&
                    (hasEventAvatar ? '이미 받았어요!' : '새해복냥 받기')}
                </Button>
              </div>
            </div>
          </div>
          {isAuthenticated && hasEventAvatar && (
            <div className='rounded-lg bg-green-500/10 p-3 text-base text-green-300'>
              🎉 새해복냥이 지급되었습니다! 인벤토리에서 확인해보세요.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;
