import { getCatKorName } from '@/pages/gacha/constants/catMappings';

interface CatListCardProps {
  name: string;
  rarity?: 'H' | 'S' | 'A' | 'B' | 'C' | 'D';
}

const AvatarCard = ({ name, rarity = 'S' }: CatListCardProps) => {
  const limitedCats = ['MagpieCat', 'TteokgukCat'];
  const isLimited = limitedCats.includes(name);

  const rarityColors = {
    H: 'text-[#26ffc9]',
    S: 'text-[#f74600]',
    A: 'text-[#ffc337]',
    B: 'text-[#7abf16]',
    C: 'text-[#108df1]',
    D: 'text-[#a663ee]',
  };

  return (
    <div className='relative rounded-lg bg-slate-900/40 p-2'>
      {isLimited && (
        <div className='absolute -right-3 top-0 z-10 rotate-12 transform'>
          <div className='rounded-sm bg-red-500 px-2 py-0.5 shadow-md'>
            <div className='text-xs font-medium text-white'>기간한정</div>
          </div>
        </div>
      )}
      <div className='relative aspect-square'>
        <img
          src={`/cats/${name}.svg`}
          alt={name}
          className='h-full w-full object-contain p-1'
        />
      </div>
      <div className='mt-2 flex flex-col items-center space-y-1'>
        <span className='text-sm font-medium text-blue-100'>
          {getCatKorName(name)}
        </span>
        <span className={`text-xs font-semibold ${rarityColors[rarity]}`}>
          {rarity}등급
        </span>
      </div>
    </div>
  );
};

export default AvatarCard;
