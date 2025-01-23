interface RarityInfo {
  rarity: string;
  dropRate: string;
  color: string;
}

const RARITY_INFO: RarityInfo[] = [
  { rarity: 'S', dropRate: '1', color: '#f74600' },
  { rarity: 'A', dropRate: '4', color: '#ffc337' },
  { rarity: 'B', dropRate: '30', color: '#7abf16' },
  { rarity: 'C', dropRate: '45', color: '#108df1' },
  { rarity: 'D', dropRate: '20', color: '#a663ee' },
];

export const GachaDropRateInfo = () => (
  <div className='w-40 rounded-lg bg-white/10 px-6 py-4 shadow-md backdrop-blur-sm'>
    <div className='mb-2 text-center text-lg font-bold text-white'>
      획득 확률
    </div>
    <hr className='mb-4' />
    {RARITY_INFO.map(({ rarity, dropRate, color }) => (
      <div key={rarity} className='mb-1 flex items-center gap-4'>
        <span className='text-base font-bold' style={{ color: color }}>
          {rarity}
        </span>
        <span className='text-base text-white'>{dropRate}%</span>
      </div>
    ))}
  </div>
);
