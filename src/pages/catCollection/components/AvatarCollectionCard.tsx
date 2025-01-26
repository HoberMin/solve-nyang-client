import { getCatKorName } from '@/pages/gacha/constants/catMappings';

const AvatarCollectionCard = ({
  name,
  owned,
}: {
  name: string;
  owned: boolean;
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative h-32 w-32 lg:h-32 lg:w-32 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'>
        <img
          src={`/cats/${name}.svg`}
          alt={name}
          className={`absolute inset-0 m-auto h-full w-full object-contain ${
            !owned ? 'brightness-0' : ''
          }`}
        />
      </div>
      <span className='mt-2 text-base font-medium text-white'>
        {getCatKorName(name)}
      </span>
    </div>
  );
};

export default AvatarCollectionCard;
