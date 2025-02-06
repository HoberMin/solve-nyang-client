import { RARITY_FILTER } from '@/constant/rarityconfig';
import { RarityFilterType } from '@/lib/type';
import { cn } from '@/lib/utils';

import { RARITY_STYLES } from './style';

interface RarityFilterProps {
  selectedRarity: RarityFilterType;
  onRarityChange: (rarity: RarityFilterType) => void;
}

export const RarityFilter = ({
  selectedRarity,
  onRarityChange,
}: RarityFilterProps) => {
  return (
    <div className='flex gap-2'>
      {RARITY_FILTER.map(rarity => {
        const isSelected = selectedRarity === rarity;

        return (
          <button
            key={rarity}
            onClick={() => onRarityChange(rarity)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition-all', // 텍스트 크기와 굵기 증가, 패딩 조정
              'border border-transparent bg-blue-950/50',
              'focus:outline-none focus:ring-0',
              'select-none',
              isSelected
                ? RARITY_STYLES[rarity].selected
                : RARITY_STYLES[rarity].default,
              isSelected && 'border-current',
            )}
          >
            {rarity}
          </button>
        );
      })}
    </div>
  );
};
