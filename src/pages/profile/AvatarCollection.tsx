import { useState } from 'react';

import { Check } from 'lucide-react';

import { useGetUserAvatar, useToggleAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

export type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';

export interface RarityStyle {
  border: string;
  text: string;
}

export type FilterType = 'ALL' | Rarity;

export const AvatarCollection = () => {
  const rarityOrder: Rarity[] = ['S', 'A', 'B', 'C', 'D'];

  const rarityConfig: Record<Rarity, RarityStyle> = {
    S: { border: 'border-[#f74600]', text: 'text-[#f74600]' },
    A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]' },
    B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]' },
    C: { border: 'border-[#108df1]', text: 'text-[#108df1]' },
    D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]' },
  };

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const { data, isError } = useGetUserAvatar();
  const mutate = useToggleAvatar();

  if (isError) {
    throw new Error();
  }

  const { avatars } = data;
  const visibleCharacters = avatars.filter(char => char.visible);

  const toggleCharacter = (id: string) => {
    if (
      visibleCharacters.length >= 15 &&
      !visibleCharacters.find(char => char.ownedAvatarId === id)
    )
      return;
    mutate(id);
  };

  const rarityCounts = rarityOrder.reduce(
    (counts, rarity) => {
      counts[rarity] = avatars.filter(char => char.rarity === rarity).length;
      return counts;
    },
    {} as Record<Rarity, number>,
  );

  const filteredCharacters = avatars
    .filter(char => selectedFilter === 'ALL' || char.rarity === selectedFilter)
    .sort((a, b) => {
      const isAVisible = a.visible;
      const isBVisible = b.visible;
      if (isAVisible !== isBVisible) return isAVisible ? -1 : 1;
      const rarityAIndex = rarityOrder.indexOf(a.rarity);
      const rarityBIndex = rarityOrder.indexOf(b.rarity);

      return rarityAIndex - rarityBIndex;
    });

  return (
    <div className='rounded-xl border p-6'>
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <h3 className='text-lg font-bold text-blue-400'>Avatar COLLECTION</h3>
          <div className='flex items-center gap-2 rounded-full px-3 py-1.5'>
            <div className='flex items-baseline gap-1'>
              <span className='text-base font-medium text-blue-400'>
                {visibleCharacters.length}
              </span>
              <span className='text-base text-blue-400/70'>/</span>
              <span className='text-base text-blue-400/70'>15</span>
            </div>
          </div>
          <span className='text-sm text-blue-400/70'>
            {15 - visibleCharacters.length} slots remaining
          </span>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
            <div key={rarity} className='flex items-center'>
              <button
                onClick={() => setSelectedFilter(rarity)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  selectedFilter === rarity
                    ? rarity === 'ALL'
                      ? 'bg-black text-white'
                      : `bg-${rarityConfig[rarity].text.split('-')[1]} text-white`
                    : 'text-blue-400',
                )}
              >
                {rarity}
                {rarity !== 'ALL' && (
                  <span
                    className={cn(
                      'ml-1',
                      selectedFilter === rarity
                        ? 'text-white'
                        : 'text-gray-500',
                    )}
                  >
                    ({rarityCounts[rarity] || 0})
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-3 md:grid-cols-5 lg:grid-cols-7'>
        {filteredCharacters.map(char => {
          const isSelected = char.visible;
          const rarity = rarityConfig[char.rarity];

          return (
            <div
              key={char.ownedAvatarId}
              onClick={() => toggleCharacter(char.ownedAvatarId)}
              className='group relative cursor-pointer'
            >
              <div
                className={cn(
                  'relative rounded-lg border-2',
                  'transition-colors duration-200',
                  rarity.border,
                  isSelected ? 'bg-gray-700' : '',
                )}
              >
                <img
                  src={`/cats/${char.name}.svg`}
                  alt={char.name}
                  className='aspect-square w-full rounded-lg object-contain p-2.5'
                />

                <div
                  className={cn(
                    'absolute right-1.5 top-1.5',
                    'flex h-5 w-5 items-center justify-center rounded-full',
                    isSelected ? 'bg-blue-500' : 'bg-gray-600',
                  )}
                >
                  <Check className='h-[8px] w-[8px] text-white' />
                </div>

                <div
                  className={cn(
                    'absolute left-1.5 top-1.5',
                    'rounded px-1.5 py-0.5 text-xs font-medium',
                    rarity.text,
                  )}
                >
                  {char.rarity}
                </div>
              </div>

              <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                <div className='flex h-full w-full items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm'>
                  <span className='text-lg font-medium text-white'>
                    {getCatKorName(char.name)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
