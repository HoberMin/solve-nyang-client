import { useState } from 'react';

import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const toggle = useToggleAvatar();
  const { data } = useGetUserAvatar();
  const { avatars } = data;
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set(
      avatars.filter(char => char.visible).map(char => char.ownedAvatarId),
    ),
  );

  const toggleCharacter = (id: string) => {
    const newSelected = new Set(selectedCharacters);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size >= 20) return;
      newSelected.add(id);
    }
    toggle(id);
    setSelectedCharacters(newSelected);
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
      const isASelected = selectedCharacters.has(a.ownedAvatarId);
      const isBSelected = selectedCharacters.has(b.ownedAvatarId);
      if (isASelected !== isBSelected) return isASelected ? -1 : 1;
      const rarityAIndex = rarityOrder.indexOf(a.rarity);
      const rarityBIndex = rarityOrder.indexOf(b.rarity);

      return rarityAIndex - rarityBIndex;
    });

  return (
    <div className='rounded-xl border p-6'>
      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-4'>
          <h2 className='font-pixel text-lg text-blue-400'>
            Avatar COLLECTION
          </h2>
          <div className='flex items-center gap-2 rounded-full px-3 py-1'>
            <div className='flex items-baseline gap-1 text-sm'>
              <span className='font-medium text-blue-400'>
                {selectedCharacters.size}
              </span>
              <span className='text-blue-400/70'>/</span>
              <span className='text-blue-400/70'>20</span>
            </div>
          </div>
          <span className='text-sm text-blue-400/70'>
            {20 - selectedCharacters.size} slots remaining
          </span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
            <div key={rarity} className='flex items-center gap-2'>
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
                      'ml-2 text-xs',
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
          <Link
            to={`/sale`}
            className='rounded-lg border-2 border-white bg-blue-600 px-4 py-2 font-bold uppercase tracking-wider text-white shadow-md hover:bg-blue-700 focus:outline-none'
          >
            판매
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'>
        {filteredCharacters.map(char => {
          const isSelected = selectedCharacters.has(char.ownedAvatarId);
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
                src={char.name}
                alt={char.name}
                className='aspect-square w-full rounded-lg object-contain p-2'
              />

              <div
                className={cn(
                  'absolute right-1 top-1',
                  'flex h-5 w-5 items-center justify-center rounded-full',
                  isSelected ? 'bg-blue-500' : 'bg-gray-600',
                )}
              >
                <Check className='h-3 w-3 text-white' />
              </div>

              <div
                className={cn(
                  'absolute left-1 top-1',
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
