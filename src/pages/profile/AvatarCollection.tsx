import { useState } from 'react';

import { Check } from 'lucide-react';

import { useGetUserAvatar, useToggleAvatar } from '@/apis/user';
import RetroLoading from '@/components/RetroLoading';
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
  const { data, isPending, isError } = useGetUserAvatar();
  const mutate = useToggleAvatar();

  if (isPending) {
    return <RetroLoading />;
  }

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
    <div className='rounded-xl border p-8'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-4'>
          <h2 className='font-pixel text-xl text-blue-400'>
            Avatar COLLECTION
          </h2>
          <div className='flex items-center gap-2 rounded-full px-4 py-2'>
            <div className='flex items-baseline gap-1 text-2xl'>
              <span className='text-lg font-medium text-blue-400'>
                {visibleCharacters.length}
              </span>
              <span className='text-lg text-blue-400/70'>/</span>
              <span className='text-lg text-blue-400/70'>20</span>
            </div>
          </div>
          <span className='text-xl text-blue-400/70'>
            {20 - visibleCharacters.length} slots remaining
          </span>
        </div>

        <div className='flex flex-wrap gap-3'>
          {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
            <div key={rarity} className='flex items-center gap-2'>
              <button
                onClick={() => setSelectedFilter(rarity)}
                className={cn(
                  'rounded-full px-6 py-2 text-lg font-medium transition-all',
                  selectedFilter === rarity
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-400',
                )}
              >
                {rarity}
                {rarity !== 'ALL' && (
                  <span
                    className={cn(
                      'ml-2 text-base',
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

      <div className='grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'>
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
                src={'/cats/Apricot.svg'}
                alt={char.name}
                className='aspect-square w-full rounded-lg object-contain p-3'
              />

              <div
                className={cn(
                  'absolute right-2 top-2',
                  'flex h-6 w-6 items-center justify-center rounded-full',
                  isSelected ? 'bg-blue-500' : 'bg-gray-600',
                )}
              >
                <Check className='h-4 w-4 text-white' />
              </div>

              <div
                className={cn(
                  'absolute left-2 top-2',
                  'rounded px-2 py-1 text-sm font-medium',
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
