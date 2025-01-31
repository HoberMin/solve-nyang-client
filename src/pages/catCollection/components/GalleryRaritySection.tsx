import { useState } from 'react';

import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

import { RarityType } from '@/apis/avatar';
import { AvatarGallery } from '@/apis/gallery';

import AvatarCollectionCard from './AvatarCollectionCard';

const VISIBLE_CARDS = 5;

const rarityColors: Record<RarityType, string> = {
  S: 'from-[#f74600]/80',
  A: 'from-[#ffc337]/80',
  B: 'from-[#7abf16]/80',
  C: 'from-[#108df1]/80',
  D: 'from-[#a663ee]',
};

const getRarityBgColor = (rarity: RarityType) =>
  ({
    S: 'bg-[#f74600]',
    A: 'bg-[#ffc337]',
    B: 'bg-[#7abf16]',
    C: 'bg-[#108df1]',
    D: 'bg-[#a663ee]',
  })[rarity];

const rarityTitles: Record<RarityType, string> = {
  S: 'S등급',
  A: 'A등급',
  B: 'B등급',
  C: 'C등급',
  D: 'D등급',
};

const RaritySection = ({
  title,
  characters,
}: {
  title: RarityType;
  characters: AvatarGallery[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isCanGoBack = currentIndex > 0;
  const isCanGoForward = currentIndex + VISIBLE_CARDS < characters.length;

  return (
    <div className='w-full rounded-lg bg-black/30 p-2 backdrop-blur-sm'>
      <div
        className={`mb-2 flex items-center justify-between rounded-lg bg-gradient-to-r ${rarityColors[title]} to-transparent px-4 py-2`}
      >
        <div className='flex items-center gap-3'>
          <span
            className={`inline-block h-3 w-3 rounded-full ${getRarityBgColor(title)}`}
          />
          <h3 className='font-bold text-white'>
            {rarityTitles[title]}
            <span className='ml-3 font-normal text-white/60'>
              ({characters.length})
            </span>
          </h3>
        </div>
      </div>

      <div className='flex items-center justify-between px-2'>
        {isCanGoBack ? (
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className='group flex h-10 w-10 items-center justify-center rounded-full bg-white/20 p-2 transition-all hover:-translate-x-1 hover:bg-white/30'
          >
            <ArrowLeftCircle size={24} className='text-white transition-all' />
          </button>
        ) : (
          <div className='w-10' />
        )}

        <div className='flex justify-center gap-2'>
          {characters
            .slice(currentIndex, currentIndex + VISIBLE_CARDS)
            .map(char => (
              <AvatarCollectionCard
                key={`${char.name}-${char.owned}`}
                name={char.name}
                owned={char.owned}
              />
            ))}
        </div>

        {isCanGoForward ? (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className='group flex h-10 w-10 items-center justify-center rounded-full bg-white/20 p-2 transition-all hover:translate-x-1 hover:bg-white/30'
          >
            <ArrowRightCircle size={24} className='text-white transition-all' />
          </button>
        ) : (
          <div className='w-10' />
        )}
      </div>
    </div>
  );
};

export default RaritySection;
