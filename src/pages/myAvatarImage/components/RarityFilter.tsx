import { RARITY_FILTER } from '@/constant/rarityconfig';
import { FullRarity, RarityFilterType } from '@/lib/type';

import { styles } from '../style';

interface RarityFilterProps {
  selectedRarity: RarityFilterType;
  onRarityChange: (rarity: RarityFilterType) => void;
  counts: Record<FullRarity, number>;
}

export const RarityFilter = ({
  selectedRarity,
  onRarityChange,
  counts,
}: RarityFilterProps) => {
  return (
    <div className={styles.filter.container}>
      {RARITY_FILTER.map(rarity => (
        <button
          key={rarity}
          onClick={() => onRarityChange(rarity)}
          className={styles.filter.button(selectedRarity === rarity, rarity)}
        >
          {rarity}
          <span className='ml-2 opacity-75'>
            (
            {rarity === 'ALL'
              ? Object.values(counts).reduce((acc, curr) => acc + curr, 0)
              : counts[rarity] || 0}
            )
          </span>
        </button>
      ))}
    </div>
  );
};
