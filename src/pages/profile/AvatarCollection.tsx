import { useState } from 'react';

import { Check } from 'lucide-react';

import { useGetUserAvatar, useToggleAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';

export type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';

export interface RarityStyle {
  border: string;
  text: string;
}

export type FilterType = 'ALL' | Rarity;

export const AvatarCollection = () => {
  const rarityOrder: Rarity[] = ['S', 'A', 'B', 'C', 'D'];

  const rarityConfig: Record<Rarity, RarityStyle> = {
    S: { border: 'border-yellow-400', text: 'text-yellow-400' },
    A: { border: 'border-purple-400', text: 'text-purple-400' },
    B: { border: 'border-blue-400', text: 'text-blue-400' },
    C: { border: 'border-green-400', text: 'text-green-400' },
    D: { border: 'border-gray-400', text: 'text-gray-400' },
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
      visibleCharacters.length >= 20 &&
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
          <h3 className='text-lg text-blue-400'>Avatar COLLECTION</h3>
          <div className='flex items-center gap-2 rounded-full px-3 py-1.5'>
            <div className='flex items-baseline gap-1'>
              <span className='text-base font-medium text-blue-400'>
                {visibleCharacters.length}
              </span>
              <span className='text-base text-blue-400/70'>/</span>
              <span className='text-base text-blue-400/70'>20</span>
            </div>
          </div>
          <span className='text-sm text-blue-400/70'>
            {20 - visibleCharacters.length} slots remaining
          </span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
            <div key={rarity} className='flex items-center gap-1.5'>
              <button
                onClick={() => setSelectedFilter(rarity)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                  selectedFilter === rarity
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-400',
                )}
              >
                {rarity}
                {rarity !== 'ALL' && (
                  <span
                    className={cn(
                      'ml-1.5 text-xs',
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
              className={cn(
                'relative cursor-pointer rounded-lg border-2',
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
          );
        })}
      </div>
    </div>
  );
};
