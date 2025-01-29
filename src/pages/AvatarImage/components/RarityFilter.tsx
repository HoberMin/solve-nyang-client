import { Rarity } from '@/pages/sale/type';

import { styles } from '../style';

interface RarityFilterProps {
  selectedRarity: Rarity | 'ALL';
  onRarityChange: (rarity: Rarity | 'ALL') => void;
  counts: Record<Rarity, number>;
}

export const RarityFilter = ({
  selectedRarity,
  onRarityChange,
  counts,
}: RarityFilterProps) => {
  const rarities: (Rarity | 'ALL')[] = ['ALL', 'H', 'S', 'A', 'B', 'C', 'D'];

  return (
    <div className={styles.filter.container}>
      {rarities.map(rarity => (
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
              : counts[rarity as Rarity] || 0}
            )
          </span>
        </button>
      ))}
    </div>
  );
};
