import { useUserExtensionAvatarToggle } from '@/apis/extension';
import { UserAvatar } from '@/apis/user';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { cn, getCatKorName } from '@/lib/utils';

interface AvatarGridProps {
  avatars: UserAvatar[];
}

export const AvatarGrid = ({ avatars }: AvatarGridProps) => {
  const extensionAvatarToggle = useUserExtensionAvatarToggle();

  const handleExtensionAvatarToggle = async (ownedAvatarId: string) => {
    extensionAvatarToggle(ownedAvatarId);
  };

  return (
    <div className={cn('grid grid-cols-2 grid-cols-8 gap-3')}>
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
              className={cn(
                'text-xs font-medium',
                RARITY_CONFIG[avatar.rarity].text,
              )}
            >
              {avatar.rarity}등급
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
