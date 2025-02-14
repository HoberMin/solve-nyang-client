import { AvatarGallery } from '@/apis/gallery';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { cn, getCatKorName } from '@/lib/utils';

interface CatCardProps {
  cat: AvatarGallery;
}

export const CatCard = ({ cat }: CatCardProps) => (
  <div
    className={cn(
      'group relative rounded-lg p-2 transition-all',
      'bg-gray-800/50',
    )}
  >
    <div
      className={cn(
        'mb-1 text-center text-xs font-bold',
        RARITY_CONFIG[cat.rarity].text,
      )}
    >
      {cat.rarity}
    </div>
    <div className='relative aspect-square'>
      <img
        src={`/cats/${cat.name}.svg`}
        alt={cat.name}
        className={cn(
          'h-full w-full rounded object-cover',
          !cat.owned && 'opacity-50 brightness-0',
        )}
      />
      <div className='mt-1 truncate text-center text-xs text-white'>
        {getCatKorName(cat.name)}
      </div>
    </div>
  </div>
);
