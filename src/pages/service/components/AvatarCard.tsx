import { getCatKorName } from '@/pages/gacha/constants/catMappings';

interface CatListCardProps {
  name: string;
}

const AvatarCard = ({ name }: CatListCardProps) => {
  return (
    <div className='group relative h-32 w-32 lg:h-32 lg:w-32 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'>
      <img
        src={`/cats/${name}.svg`}
        alt={name}
        className='absolute inset-0 m-auto h-full w-full object-contain'
      />
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <div className='flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-sm'>
          <span className='text-lg font-medium text-white'>
            {getCatKorName(name)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
