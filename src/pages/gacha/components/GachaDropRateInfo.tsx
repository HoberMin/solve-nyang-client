import { RarityInfo } from '@/types/gacha';

const RARITY_INFO: RarityInfo[] = [
  { rarity: 'S', dropRate: '1' },
  { rarity: 'A', dropRate: '4' },
  { rarity: 'B', dropRate: '30' },
  { rarity: 'C', dropRate: '45' },
  { rarity: 'D', dropRate: '20' },
];

export const GachaDropRateInfo = () => (
  <div className='w-48 rounded-lg bg-white/10 px-6 py-4 shadow-md backdrop-blur-sm'>
    <div className='mb-2 text-center text-lg font-bold text-white'>
      획득 확률
    </div>
    {RARITY_INFO.map(({ rarity, dropRate }) => (
      <div key={rarity} className='mb-1 flex items-center gap-4'>
        <span className='font-bold text-white'>{rarity}</span>
        <span className='text-white'>{dropRate}%</span>
      </div>
    ))}
  </div>
);
