import { cn } from '@/lib/utils';
import { Rarity } from '@/pages/sale/type';

interface RarityFilterProps {
  selectedRarity: Rarity | 'ALL';
  onRarityChange: (rarity: Rarity | 'ALL') => void;
}

interface RarityFilterProps {
  selectedRarity: Rarity | 'ALL';
  onRarityChange: (rarity: Rarity | 'ALL') => void;
}

const RARITY_STYLES = {
  ALL: {
    selected: 'bg-gray-800 text-white',
    default: 'text-blue-200 hover:bg-blue-900/50',
  },
  H: {
    selected: 'bg-[#26ffc9] text-black',
    default: 'text-[#26ffc9] hover:bg-[#26ffc9]/20',
  },
  S: {
    selected: 'bg-[#f74600] text-white',
    default: 'text-[#f74600] hover:bg-[#f74600]/20',
  },
  A: {
    selected: 'bg-[#ffc337] text-black',
    default: 'text-[#ffc337] hover:bg-[#ffc337]/20',
  },
  B: {
    selected: 'bg-[#7abf16] text-black',
    default: 'text-[#7abf16] hover:bg-[#7abf16]/20',
  },
  C: {
    selected: 'bg-[#108df1] text-white',
    default: 'text-[#108df1] hover:bg-[#108df1]/20',
  },
  D: {
    selected: 'bg-[#a663ee] text-white',
    default: 'text-[#a663ee] hover:bg-[#a663ee]/20',
  },
} as const;

export const RarityFilter = ({
  selectedRarity,
  onRarityChange,
}: RarityFilterProps) => {
  const rarities: (Rarity | 'ALL')[] = ['ALL', 'H', 'S', 'A', 'B', 'C', 'D'];

  return (
    <div className='flex gap-2'>
      {rarities.map(rarity => {
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
