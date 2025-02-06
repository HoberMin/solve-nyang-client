import { UserAvatar } from '@/apis/user';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { cn, getCatKorName } from '@/lib/utils';

interface AvatarCardProps {
  avatar: UserAvatar;
  onClick: () => void;
}

export const AvatarCard = ({ avatar, onClick }: AvatarCardProps) => {
  const rarity = avatar.rarity;

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
            RARITY_CONFIG[rarity].text,
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
