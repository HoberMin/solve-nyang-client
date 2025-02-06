import { RARITY_CONFIG, RARITY_FILTER } from '@/constant/rarityconfig';
import { cn } from '@/lib/utils';
import PointDisplay from '@/pages/gacha/components/PointDisplay';

import { HeaderSectionProps } from '../type';

export const POINT_PER_AVATAR = 30;

const HeaderSection = ({
  totalPoints,
  selectedRarity,
  setSelectedRarity,
  rarityCounts,
}: HeaderSectionProps) => {
  const totalCount = Object.values(rarityCounts).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <div className='sticky top-0 z-10 bg-gray-900/95 py-4 backdrop-blur-sm'>
      <div className='flex items-start justify-between px-6'>
        <div className='flex-1'>
          <div className='mb-6 mt-8'>
            <div className='mb-2 text-2xl font-bold text-blue-400 shadow-blue-400/50 drop-shadow-lg'>
              고양이 캐릭터 판매
            </div>
            <p className='text-lg text-gray-400'>
              고양이 캐릭터 한개당 {POINT_PER_AVATAR}냥코인을 획득할 수 있습니다
            </p>
            <div className='mt-8 text-xl'>
              <span className='text-gray-400'>획득 냥코인: </span>
              <span className='text-blue-400'>{totalPoints}</span>
            </div>
          </div>

          <div className='flex cursor-pointer gap-2'>
            {RARITY_FILTER.map(rarity => (
              <span
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={cn(
                  'rounded-md border-gray-200 px-3 py-1 transition-all',
                  selectedRarity === rarity
                    ? rarity === 'ALL'
                      ? 'bg-black text-white'
                      : `bg-${RARITY_CONFIG[rarity].text.split('-')[1]} text-white`
                    : 'text-blue-400',
                )}
              >
                {rarity}
                {rarity === 'ALL' ? (
                  <span
                    className={cn(
                      'ml-1',
                      selectedRarity === 'ALL' ? 'text-white' : 'text-gray-500',
                    )}
                  >
                    ({totalCount})
                  </span>
                ) : (
                  <span
                    className={cn(
                      'ml-1',
                      selectedRarity === rarity
                        ? 'text-white'
                        : 'text-gray-500',
                    )}
                  >
                    ({rarityCounts[rarity] || 0})
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className='mt-8'>
          <PointDisplay />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
