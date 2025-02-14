import { Award } from 'lucide-react';

import { AvatarGallery } from '@/apis/gallery';
import { RarityFilterType } from '@/lib/type';
import { RarityFilter } from '@/pages/extension/components/RarityFilter';

import { CatGrid } from './CatGrid';

interface CatGalleryProps {
  collections: AvatarGallery[];
  selectedRarity: RarityFilterType;
  onRarityChange: (rarity: RarityFilterType) => void;
}

export const CatGallery = ({
  collections,
  selectedRarity,
  onRarityChange,
}: CatGalleryProps) => {
  const filteredCollections = collections.filter(cat =>
    selectedRarity === 'ALL' ? true : cat.rarity === selectedRarity,
  );

  return (
    <div className='rounded-lg bg-white/10 p-6 backdrop-blur-sm'>
      <div className='mb-6 flex flex-col gap-4'>
        <div className='flex items-center'>
          <Award className='mr-2 h-6 w-6 text-yellow-400' />
          <h2 className='text-2xl font-bold text-white'>고양이 도감</h2>
        </div>
        <RarityFilter
          selectedRarity={selectedRarity}
          onRarityChange={onRarityChange}
        />
      </div>
      <CatGrid collections={filteredCollections} />
    </div>
  );
};
