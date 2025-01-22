import { memo } from 'react';

import { CAT_MAPPINGS, RARITY_TO_IMAGE } from '../constants/catMappings';
import { RARITY_INFO } from '../constants/rarityInfo';
import { SummaryItemProps } from '../hooks/usePreloader';

interface RarityInfo {
  dropRate: string;
  color: string;
}

const RARITY_INFO: Record<string, RarityInfo> = {
  S: { dropRate: '1', color: '#f74600' },
  A: { dropRate: '4', color: '#ffc337' },
  B: { dropRate: '30', color: '#7abf16' },
  C: { dropRate: '45', color: '#108df1' },
  D: { dropRate: '20', color: '#a663ee' },
};

export const SummaryItem = memo(({ result }: SummaryItemProps) => {
  const capsuleImages =
    RARITY_TO_IMAGE[result.rarity as keyof typeof RARITY_TO_IMAGE];

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <img
        src={capsuleImages.opened}
        alt={`${result.rarity} Capsule`}
        className='h-[250px] w-[250px]'
      />
      <div className='absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-300/30 blur-xl' />
      <img
        src={`/cats/${result.name}.svg`}
        alt={result.name}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[65%] transform'
      />
      <div className='flex justify-center gap-4'>
        <div
          className='text-xl font-bold'
          style={{ color: RARITY_INFO[result.rarity].color }}
        >
          {result.rarity}
        </div>
        <div className='text-center text-xl font-bold text-white'>
          {CAT_MAPPINGS[result.name]?.korName}
        </div>
      </div>
    </div>
  );
});

SummaryItem.displayName = 'SummaryItem';
