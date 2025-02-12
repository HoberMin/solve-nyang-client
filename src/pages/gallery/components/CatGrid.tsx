import { AvatarGallery } from '@/apis/gallery';

import { CatCard } from './CatCard';

type CatGridProps = {
  collections: AvatarGallery[];
};

export const CatGrid = ({ collections }: CatGridProps) => (
  <div className='grid grid-cols-6 gap-4 md:grid-cols-8'>
    {collections.map((cat, index) => (
      <CatCard key={index} cat={cat} />
    ))}
  </div>
);
