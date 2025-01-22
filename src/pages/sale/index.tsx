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

import { getCatKorName } from '../gacha/constants/catMappings';

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
          <div className='mb-6 mt-8 text-center'>
            <div className='font-pixel mb-2 text-2xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              아바타 판매
            </div>
            <p className='font-mono text-lg text-gray-400'>
              아바타 한개당 {POINT_PER_AVATAR}포인트를 획득할 수 있습니다
            </p>
            <div className='mt-2 font-mono'>
              <span className='text-base text-gray-400'>획득 포인트: </span>
              <span className='text-base text-blue-400'>{totalPoints}</span>
            </div>
          </div>

          {/* 등급 필터 */}
          <div className='mb-4 flex justify-center gap-2'>
            {['All', 'S', 'A', 'B', 'C', 'D'].map(rarity => (
              <span
                key={rarity}
                onClick={() => setSelectedRarity(rarity as Rarity | 'All')}
                className={cn(
                  'rounded px-3 py-1 font-mono text-base transition-all',
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
        <div className='flex-1 overflow-y-auto px-1 pb-32 pt-16'>
          <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
            {filteredAvatars.map(avatar => {
              const isSelected = selectedAvatars.some(
                item => item.ownedAvatarId === avatar.ownedAvatarId,
              );

              return (
                <div
                  key={avatar.ownedAvatarId}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={cn(
                    'relative cursor-pointer rounded-lg border p-1.5 transition-all hover:scale-105',
                    isSelected && 'border-blue-400 bg-blue-400/10',
                    !isSelected &&
                      avatar.rarity === 'S' &&
                      'border-yellow-300/50 bg-yellow-300/5',
                    !isSelected &&
                      avatar.rarity === 'A' &&
                      'border-rose-300/50 bg-rose-300/5',
                    !isSelected &&
                      avatar.rarity === 'B' &&
                      'border-blue-400/50 bg-blue-400/5',
                    !isSelected &&
                      avatar.rarity === 'C' &&
                      'border-green-400/50 bg-green-400/5',
                    !isSelected &&
                      avatar.rarity === 'D' &&
                      'border-gray-700 bg-gray-800/50',
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
                        <span className='font-mono text-base text-blue-400'>
                          +{POINT_PER_AVATAR}P
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='mt-2 text-center font-mono'>
                    <p
                      className={cn(
                        'text-sm',
                        avatar.rarity === 'S' && 'font-bold text-yellow-300',
                        avatar.rarity === 'A' && 'text-rose-300',
                        avatar.rarity === 'B' && 'text-blue-400',
                        avatar.rarity === 'C' && 'text-green-400',
                        avatar.rarity === 'D' && 'text-gray-400',
                      )}
                    >
                      {getCatKorName(avatar.name)}
                    </p>
                    <p
                      className={cn(
                        'text-xs',
                        avatar.rarity === 'S' && 'font-bold text-yellow-300',
                        avatar.rarity === 'A' && 'text-rose-300',
                        avatar.rarity === 'B' && 'text-blue-400',
                        avatar.rarity === 'C' && 'text-green-400',
                        avatar.rarity === 'D' && 'text-gray-400',
                      )}
                    >
                      {avatar.rarity}등급
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 플로팅 버튼 영역 */}
        <div className='fixed bottom-0 left-0 right-0 flex justify-center gap-4 border-t border-gray-800 bg-gray-900/95 px-6 py-4 backdrop-blur-sm'>
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
            className='cursor-pointer rounded-full border border-gray-700 bg-gray-800 px-4 py-2 font-mono text-base text-gray-400 transition-colors hover:border-red-500 hover:text-red-500'
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
                  'cursor-pointer rounded-full border px-6 py-2 font-mono text-base transition-colors',
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
                <DialogTitle className='font-pixel text-xl text-blue-400'>
                  판매 확인
                </DialogTitle>
                <DialogDescription className='font-mono text-base text-gray-400'>
                  {selectedAvatars.length}개의 아바타를 판매하시겠습니까?
                  <br />
                  <span className='mt-3 block text-lg text-blue-400'>
                    획득 포인트: {totalPoints}P
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-end gap-4 pt-4'>
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
                  className='cursor-pointer rounded-full px-4 py-2 font-mono text-base text-gray-400 hover:text-white'
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
                  className='cursor-pointer rounded-full border border-blue-400 px-4 py-2 font-mono text-base text-blue-400 hover:bg-blue-400 hover:text-gray-900'
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
