import { useState } from 'react';

import { UserAvatar, useGetUserAvatar, useSaleAvatar } from '@/apis/user';
import Layout from '@/components/Layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const POINT_PER_AVATAR = 30;

type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';

export const AvatarSalePage = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<UserAvatar[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All');

  const { data, isPending: isLoading } = useGetUserAvatar();
  const { mutate: saleAvatars } = useSaleAvatar();

  const totalPoints = selectedAvatars.length * POINT_PER_AVATAR;

  const isCanSale = selectedAvatars.length > 0;

  const handleAvatarSelect = (avatar: UserAvatar) => {
    setSelectedAvatars(prev =>
      prev.find(item => item.ownedAvatarId === avatar.ownedAvatarId)
        ? prev.filter(item => item.ownedAvatarId !== avatar.ownedAvatarId)
        : [...prev, avatar],
    );
  };

  const handleSale = () => {
    saleAvatars({ avatars: selectedAvatars });
  };

  const filteredAvatars =
    data?.avatars.filter(avatar =>
      selectedRarity === 'All' ? true : avatar.rarity === selectedRarity,
    ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Layout>
      <div className='relative mx-auto flex h-full w-full max-w-7xl flex-col'>
        {/* 헤더 섹션 */}
        <div className='sticky top-0 z-10 py-4'>
          <div className='mb-6 mt-10 text-center'>
            <h1 className='font-pixel mb-2 text-4xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              아바타 판매
            </h1>
            <p className='font-mono text-3xl text-gray-400'>
              아바타 한개당 {POINT_PER_AVATAR}포인트를 획득할 수 있습니다
            </p>
            <div className='mt-3 font-mono'>
              <span className='text-2xl text-gray-400'>획득 포인트: </span>
              <span className='text-2xl text-blue-400'>{totalPoints}</span>
            </div>
          </div>

          {/* 등급 필터 */}
          <div className='mb-4 flex justify-center gap-2'>
            {['All', 'S', 'A', 'B', 'C', 'D'].map(rarity => (
              <span
                key={rarity}
                onClick={() => setSelectedRarity(rarity as Rarity | 'All')}
                className={cn(
                  'rounded px-5 py-1.5 font-mono text-2xl transition-all',
                  selectedRarity === rarity
                    ? 'bg-blue-400 text-gray-900'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
                )}
              >
                {rarity}
              </span>
            ))}
          </div>
        </div>

        {/* 아바타 그리드 */}
        <div className='flex-1 overflow-y-auto px-1 pb-40 pt-20'>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {filteredAvatars.map(avatar => {
              const isSelected = selectedAvatars.some(
                item => item.ownedAvatarId === avatar.ownedAvatarId,
              );

              return (
                <div
                  key={avatar.ownedAvatarId}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={cn(
                    'relative cursor-pointer rounded-lg border p-2 transition-all hover:scale-105',
                    isSelected && 'border-blue-400 bg-blue-400/10',
                    !isSelected && 'border-gray-700 bg-gray-800/50',
                  )}
                >
                  <div className='relative aspect-square overflow-hidden rounded-md'>
                    <img
                      src={`/cats/${avatar.name}.svg`}
                      alt={avatar.name}
                      className='h-full w-full object-cover p-3'
                    />
                    {isSelected && (
                      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50'>
                        <span className='font-mono text-2xl text-blue-400'>
                          +{POINT_PER_AVATAR}P
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='mt-3 text-center font-mono'>
                    <p className='text-xl text-white'>{avatar.name}</p>
                    <p className='text-lg text-blue-400'>{avatar.rarity}등급</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 플로팅 버튼 영역 */}
        <div className='fixed bottom-0 left-0 right-0 flex justify-center gap-4 border-t border-gray-800 bg-gray-900/95 px-6 py-5 backdrop-blur-sm'>
          <span
            role='button'
            tabIndex={0}
            onClick={() => setSelectedAvatars([])}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedAvatars([]);
              }
            }}
            className='cursor-pointer rounded-full border border-gray-700 bg-gray-800 px-6 py-3 font-mono text-2xl text-gray-400 transition-colors hover:border-red-500 hover:text-red-500'
          >
            초기화
          </span>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <span
                role='button'
                tabIndex={0}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && isCanSale) {
                    e.preventDefault();
                    setIsDialogOpen(true);
                  }
                }}
                className={cn(
                  'cursor-pointer rounded-full border px-8 py-3 font-mono text-2xl transition-colors',
                  isCanSale
                    ? 'border-blue-400 bg-blue-400/10 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
                    : 'cursor-not-allowed border-gray-700 bg-gray-800/50 text-gray-700',
                )}
              >
                판매하기
              </span>
            </DialogTrigger>
            <DialogContent className='border-gray-600 bg-gray-900'>
              <DialogHeader>
                <DialogTitle className='font-pixel text-2xl text-blue-400'>
                  판매 확인
                </DialogTitle>
                <DialogDescription className='font-mono text-lg text-gray-400'>
                  {selectedAvatars.length}개의 아바타를 판매하시겠습니까?
                  <br />
                  <span className='mt-4 block text-2xl text-blue-400'>
                    획득 포인트: {totalPoints}P
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-end gap-6 pt-6'>
                <span
                  role='button'
                  tabIndex={0}
                  onClick={() => setIsDialogOpen(false)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsDialogOpen(false);
                    }
                  }}
                  className='cursor-pointer rounded-full px-6 py-3 font-mono text-2xl text-gray-400 hover:text-white'
                >
                  취소
                </span>
                <span
                  role='button'
                  tabIndex={0}
                  onClick={handleSale}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSale();
                    }
                  }}
                  className='cursor-pointer rounded-full border border-blue-400 px-6 py-3 font-mono text-2xl text-blue-400 hover:bg-blue-400 hover:text-gray-900'
                >
                  확인
                </span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default AvatarSalePage;
