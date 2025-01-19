import { Check } from 'lucide-react';

import { UserAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';

export type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';

export interface RarityStyle {
  border: string;
  text: string;
}

export type FilterType = 'ALL' | Rarity;

interface CharacterCollectionProps {
  selectedCharacters: Set<string>;
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filteredCharacters: UserAvatar[];
  toggleCharacter: (id: string) => void;
  rarityConfig: Record<Rarity, RarityStyle>;
  rarityOrder: Rarity[];
}

export const AvatarCollection = ({
  selectedCharacters,
  selectedFilter,
  setSelectedFilter,
  filteredCharacters,
  toggleCharacter,
  rarityConfig,
  rarityOrder,
}: CharacterCollectionProps) => (
  <div className='rounded-xl border p-6'>
    <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-4'>
        <h2 className='font-pixel text-lg text-blue-400'>
          CHARACTER COLLECTION
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
          <button
            key={rarity}
            onClick={() => setSelectedFilter(rarity)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              selectedFilter === rarity
                ? 'bg-blue-500 text-white'
                : 'text-blue-400',
            )}
          >
            {rarity}
          </button>
        ))}
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
