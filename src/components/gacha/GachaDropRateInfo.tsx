import { RarityInfo } from '@/types/gacha';

const RARITY_INFO: RarityInfo[] = [
  { rarity: 'S', dropRate: '3' },
  { rarity: 'A', dropRate: '7' },
  { rarity: 'B', dropRate: '15' },
  { rarity: 'C', dropRate: '27' },
  { rarity: 'D', dropRate: '48' },
];

export const GachaDropRateInfo = () => (
  <div className='fixed right-10 top-24 w-48 rounded-lg bg-black/30 p-5 shadow-md backdrop-blur-sm'>
    <div className='mb-2 text-center text-lg font-bold text-white'>
      DROP RATE
    </div>
    {RARITY_INFO.map(({ rarity, dropRate }) => (
      <div key={rarity} className='mb-1 flex items-center gap-4'>
        <span className='font-bold text-white'>{rarity}</span>
        <span className='text-white'>{dropRate}%</span>
      </div>
    ))}
  </div>
);
