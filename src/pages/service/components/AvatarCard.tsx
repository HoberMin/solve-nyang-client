import { getCatKorName } from '@/pages/gacha/constants/catMappings';

interface CatListCardProps {
  name: string;
  rarity?: 'H' | 'S' | 'A' | 'B' | 'C' | 'D';
}

const AvatarCard = ({ name, rarity = 'S' }: CatListCardProps) => {
  const newCats = [
    'CaffeineCat',
    'SingingCat',
    'WorkCat',
    'DiverCat',
    'AngryCat',
    'SplashCat',
    'FarmerCat',
    'BookCat',
    'PhoneCat',
    'BirthdayCat',
    'JumpCat',
    'SickCat',
    'GymCat',
    'MagpieCat',
    'TteokgukCat',
  ];

  const isNew = newCats.includes(name);

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
      {isNew && (
        <div className='absolute right-0 top-0 z-10 transform'>
          <div className='rounded-sm bg-emerald-500 px-2 py-0.5 shadow-md'>
            <div className='text-xs font-medium text-white'>NEW</div>
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
