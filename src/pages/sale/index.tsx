import { useState } from 'react';

import {
  UserAvatar,
  useGetUserAvatar,
  useGetUserInfo,
  useSaleAvatar,
} from '@/apis/user';
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

import { PointDisplay } from '../gacha/components/PointDisplay';
import { getCatKorName } from '../gacha/constants/catMappings';

const POINT_PER_AVATAR = 30;

type Rarity = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

interface RarityStyle {
  border: string;
  text: string;
}

interface HeaderSectionProps {
  point: number;
  totalPoints: number;
  selectedRarity: 'ALL' | Rarity;
  setSelectedRarity: (rarity: 'ALL' | Rarity) => void;
  rarityCounts: Record<Rarity, number>;
}

const rarityOrder: Rarity[] = ['H', 'S', 'A', 'B', 'C', 'D'];

const rarityConfig: Record<Rarity, RarityStyle> = {
  H: { border: 'border-[#26ffc9]', text: 'text-[#26ffc9]' },
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]' },
};

const HeaderSection: React.FC<HeaderSectionProps> = ({
  point,
  totalPoints,
  selectedRarity,
  setSelectedRarity,
  rarityCounts,
}) => {
  return (
    <div className='sticky top-0 z-10 bg-gray-900/95 py-4 backdrop-blur-sm'>
      <div className='flex items-start justify-between px-6'>
        <div className='flex-1'>
          <div className='mb-6 mt-8'>
            <div className='mb-2 text-2xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              아바타 판매
            </div>
            <p className='text-lg text-gray-400'>
              아바타 한개당 {POINT_PER_AVATAR}냥코인을 획득할 수 있습니다
            </p>
            <div className='mt-8 text-xl'>
              <span className='text-gray-400'>획득 냥코인: </span>
              <span className='text-blue-400'>{totalPoints}</span>
            </div>
          </div>

          <div className='flex cursor-pointer gap-2'>
            {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
              <span
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={cn(
                  'rounded-md border-gray-200 px-3 py-1 transition-all',
                  selectedRarity === rarity
                    ? rarity === 'ALL'
                      ? 'bg-black text-white'
                      : `bg-${rarityConfig[rarity as Rarity].text.split('-')[1]} text-white`
                    : 'text-blue-400',
                )}
              >
                {rarity}
                {rarity !== 'ALL' && (
                  <span
                    className={cn(
                      'ml-1',
                      selectedRarity === rarity
                        ? 'text-white'
                        : 'text-gray-500',
                    )}
                  >
                    ({rarityCounts[rarity as Rarity] || 0})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className='mt-8'>
          <PointDisplay point={point} />
        </div>
      </div>
    </div>
  );
};

export const AvatarSalePage = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<UserAvatar[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<'ALL' | Rarity>('ALL');

  const { data } = useGetUserAvatar();
  const { data: userInfo } = useGetUserInfo();
  const { point } = userInfo ?? { point: 0 };
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
    setIsDialogOpen(false);
    setSelectedAvatars([]);
  };

  const rarityCounts = rarityOrder.reduce<Record<Rarity, number>>(
    (counts, rarity) => {
      counts[rarity] = (data?.avatars ?? []).filter(
        char => char.rarity === rarity,
      ).length;
      return counts;
    },
    {} as Record<Rarity, number>,
  );

  const filteredAvatars = (data?.avatars ?? []).filter(avatar =>
    selectedRarity === 'ALL' ? true : avatar.rarity === selectedRarity,
  );

  return (
    <Layout>
      <div className='relative mx-auto flex h-full w-full max-w-7xl flex-col'>
        <HeaderSection
          point={point}
          totalPoints={totalPoints}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          rarityCounts={rarityCounts}
        />

        {/* 아바타 그리드 */}
        <div className='flex-1 overflow-y-auto px-1 pb-32 pt-16'>
          <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
            {filteredAvatars.map(avatar => {
              const isSelected = selectedAvatars.some(
                item => item.ownedAvatarId === avatar.ownedAvatarId,
              );
              const rarity = rarityConfig[avatar.rarity];

              return (
                <div
                  key={avatar.ownedAvatarId}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={cn(
                    'relative cursor-pointer rounded-lg border-2 p-1.5 transition-all hover:scale-105',
                    rarity.border,
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
                        <span className={cn('text-base', rarity.text)}>
                          +{POINT_PER_AVATAR}P
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='mt-2 text-center'>
                    <p
                      className={cn(
                        'text-sm',
                        rarity.text,
                        avatar.rarity === 'S' && 'font-bold',
                      )}
                    >
                      {getCatKorName(avatar.name)}
                    </p>
                    <p
                      className={cn(
                        'text-xs',
                        rarity.text,
                        avatar.rarity === 'S' && 'font-bold',
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
            className='cursor-pointer rounded-full border-2 border-red-500 bg-gray-800 px-4 py-2 text-base text-red-500 transition-colors hover:bg-red-500 hover:text-white'
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
                  'cursor-pointer rounded-full border px-6 py-2 text-base transition-colors',
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
                <DialogTitle className='text-xl text-blue-400'>
                  판매 확인
                </DialogTitle>
                <DialogDescription className='text-base text-gray-400'>
                  <div className='space-y-4'>
                    <p>
                      {selectedAvatars.length}개의 아바타를 판매하시겠습니까?
                    </p>

                    <div className='rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-400'>
                      <p className='font-medium'>⚠️ 주의!</p>
                      <p className='mt-2'>
                        다음 업데이트에서 경매장 시스템이 등장할 예정입니다.
                      </p>
                      <p>
                        지금 판매하시면 경매장에서 더 높은 가격에 판매할 기회를
                        놓치실 수 있습니다.
                      </p>
                      <p className='mt-2 font-medium'>
                        정말로 판매하시겠습니까?
                      </p>
                    </div>

                    <span className='block text-lg text-blue-400'>
                      획득 냥코인: {totalPoints}P
                    </span>
                  </div>
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
                  className='cursor-pointer rounded-full px-4 py-2 text-base text-gray-400 hover:text-white'
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
                  className='cursor-pointer rounded-full border border-blue-400 px-4 py-2 text-base text-blue-400 hover:bg-blue-400 hover:text-gray-900'
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
