import { useUserExtensionAvatarToggle } from '@/apis/extension';
import { UserAvatar } from '@/apis/user';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

interface AvatarGridProps {
  avatars: UserAvatar[];
}

export const AvatarGrid = ({ avatars }: AvatarGridProps) => {
  const extensionAvatarToggle = useUserExtensionAvatarToggle();

  const handleExtensionAvatarToggle = async (ownedAvatarId: string) => {
    extensionAvatarToggle(ownedAvatarId);
  };

  const rarityColors = {
    H: 'text-[#26ffc9]',
    S: 'text-[#f74600]',
    A: 'text-[#ffc337]',
    B: 'text-[#7abf16]',
    C: 'text-[#108df1]',
    D: 'text-[#a663ee]',
  };

  return (
    <div
      className={cn(
        'grid gap-3',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7',
      )}
    >
      {avatars.map(avatar => (
        <div
          key={avatar.ownedAvatarId}
          onClick={() => handleExtensionAvatarToggle(avatar.ownedAvatarId)}
          className={cn(
            'relative rounded-lg bg-slate-900/40 p-2',
            'cursor-pointer transition-colors hover:bg-slate-900/60',
          )}
        >
          <div className='relative aspect-square'>
            <img
              src={`/cats/${avatar.name}.svg`}
              alt={getCatKorName(avatar.name)}
              className='h-full w-full object-contain p-1'
            />
          </div>
          <div className='mt-2 flex flex-col items-center space-y-1'>
            <span className='text-sm font-medium text-blue-100'>
              {getCatKorName(avatar.name)}
            </span>
            <span
              className={cn('text-xs font-medium', rarityColors[avatar.rarity])}
            >
              {avatar.rarity}등급
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
