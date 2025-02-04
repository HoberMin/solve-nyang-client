import { UserAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

import { RarityType } from './AvatarCollection';

export const rarityColors: Record<
  RarityType,
  { bg: string; text: string; border: string }
> = {
  H: { bg: 'bg-[#26ffc9]', text: 'text-[#26ffc9]', border: 'border-[#26ffc9]' },
  S: { bg: 'bg-[#f74600]', text: 'text-[#f74600]', border: 'border-[#f74600]' },
  A: { bg: 'bg-[#ffc337]', text: 'text-[#ffc337]', border: 'border-[#ffc337]' },
  B: { bg: 'bg-[#7abf16]', text: 'text-[#7abf16]', border: 'border-[#7abf16]' },
  C: { bg: 'bg-[#108df1]', text: 'text-[#108df1]', border: 'border-[#108df1]' },
  D: { bg: 'bg-[#a663ee]', text: 'text-[#a663ee]', border: 'border-[#a663ee]' },
};

interface AvatarCardProps {
  avatar: UserAvatar;
  onClick: () => void;
}

export const AvatarCard = ({ avatar, onClick }: AvatarCardProps) => {
  const rarity = avatar.rarity as RarityType;

  return (
    <div
      onClick={onClick}
      className='relative cursor-pointer rounded-lg border border-white/10 p-2 transition-all hover:bg-white/5'
    >
      <div className='relative aspect-square'>
        <img
          src={`/cats/${avatar.name}.svg`}
          alt={avatar.name}
          className='h-full w-full object-contain p-1'
        />
        <div
          className={cn(
            'absolute right-1 top-1 text-xs font-bold',
            rarityColors[rarity].text,
          )}
        >
          {rarity}
        </div>
      </div>
      <div className='mt-1 text-center text-sm font-medium text-blue-100'>
        {getCatKorName(avatar.name)}
      </div>
    </div>
  );
};
