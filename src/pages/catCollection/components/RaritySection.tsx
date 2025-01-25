import { useState } from 'react';

import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { Character } from '@/pages/service/components/AllAvatarList';
import AvatarCard from '@/pages/service/components/AvatarCard';

import AvatarCollectionCard from './AvatarCollectionCard';

interface RaritySectionProps {
  title: Character['rarity'];
  characters: Character[];
}

const VISIBLE_CARDS = 5;

const rarityTitles = {
  S: 'S등급',
  A: 'A등급',
  B: 'B등급',
  C: 'C등급',
  D: 'D등급',
} as const;

const rarityColors = {
  S: `from-[#f74600]/80`,
  A: `from-[#ffc337]/80`,
  B: `from-[#7abf16]/80`,
  C: `from-[#108df1]/80`,
  D: `from-[#a663ee]`,
} as const;

const RaritySection = ({ title, characters }: RaritySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const CardComponent =
    location.pathname === '/gallery' ? AvatarCollectionCard : AvatarCard;

  const isCanGoBack = currentIndex > 0;
  const isCanGoForward = currentIndex + VISIBLE_CARDS < characters.length;

  return (
    <div className='w-full rounded-lg bg-black/30 p-2 backdrop-blur-sm'>
      <div
        className={`mb-2 flex items-center justify-between rounded-lg bg-gradient-to-r ${rarityColors[title]} to-transparent px-4 py-2`}
      >
        <div className='flex items-center gap-3'>
          <span
            className={`inline-block h-3 w-3 rounded-full ${
              title === 'S'
                ? 'bg-[#f74600]'
                : title === 'A'
                  ? 'bg-[#ffc337]'
                  : title === 'B'
                    ? 'bg-[#7abf16]'
                    : title === 'C'
                      ? 'bg-[#108df1]'
                      : 'bg-[#a663ee]'
            }`}
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
              <CardComponent key={char.id} name={char.name} />
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
