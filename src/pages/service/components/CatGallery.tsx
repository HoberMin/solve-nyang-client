import React, { useState } from 'react';

import _ from 'lodash';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

import { useGetAvatarList } from '@/apis/avatar';

interface Character {
  id: string;
  name: string;
  rarity: 'S' | 'A' | 'B' | 'C' | 'D';
}

interface CharacterCardProps {
  name: string;
  rarity: Character['rarity'];
}

interface RaritySectionProps {
  title: Character['rarity'];
  characters: Character[];
}

const VISIBLE_CARDS = 7;

const CharacterCard: React.FC<CharacterCardProps> = ({ name, rarity }) => {
  return (
    <div className='relative h-20 w-20'>
      <img
        src={`/public/${rarity}.svg`}
        alt={`${rarity} rank background`}
        className='absolute inset-0 h-full w-full'
      />
      <img
        src={`/public/cats/${name}.svg`}
        alt={name}
        className='absolute inset-0 m-auto h-4/5 w-4/5 object-contain'
      />
      <div className='absolute -bottom-5 left-0 right-0 text-center'>
        <span className='text-xs text-white/80'>{name}</span>
      </div>
    </div>
  );
};

const RaritySection: React.FC<RaritySectionProps> = ({ title, characters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rarityTitles = {
    S: 'Special',
    A: 'Advanced',
    B: 'Basic',
    C: 'Common',
    D: 'Default',
  };

  const rarityColors = {
    S: 'from-yellow-500/20',
    A: 'from-purple-500/20',
    B: 'from-blue-500/20',
    C: 'from-green-500/20',
    D: 'from-gray-500/20',
  };

  const isCanGoBack = currentIndex > 0;
  const isCanGoForward = currentIndex + VISIBLE_CARDS < characters.length;

  return (
    <div className='w-full rounded-lg bg-black/30 p-2 backdrop-blur-sm'>
      <div
        className={`mb-2 flex items-center justify-between rounded-lg bg-gradient-to-r ${rarityColors[title]} to-transparent px-4 py-2`}
      >
        <div className='flex items-center gap-2'>
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              title === 'S'
                ? 'bg-yellow-500'
                : title === 'A'
                  ? 'bg-purple-500'
                  : title === 'B'
                    ? 'bg-blue-500'
                    : title === 'C'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
            }`}
          />
          <h2 className='text-sm font-bold text-white'>
            {rarityTitles[title]}
            <span className='ml-2 text-xs font-normal text-white/60'>
              ({characters.length})
            </span>
          </h2>
        </div>
      </div>

      <div className='flex items-center justify-between px-4'>
        {isCanGoBack ? (
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className='group flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 transition-all hover:-translate-x-1 hover:bg-white/30'
          >
            <ArrowLeftCircle size={32} className='text-white transition-all' />
          </button>
        ) : (
          <div className='w-12' />
        )}

        <div className='flex justify-center gap-4'>
          {characters
            .slice(currentIndex, currentIndex + VISIBLE_CARDS)
            .map(char => (
              <CharacterCard
                key={char.id}
                name={char.name}
                rarity={char.rarity}
              />
            ))}
        </div>

        {isCanGoForward ? (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className='group flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 transition-all hover:translate-x-1 hover:bg-white/30'
          >
            <ArrowRightCircle size={32} className='text-white transition-all' />
          </button>
        ) : (
          <div className='w-12' />
        )}
      </div>
    </div>
  );
};

const CharacterGallery: React.FC = () => {
  const { data } = useGetAvatarList();
  const { avatars = [] } = data || {};
  const groupedCharacters = _.groupBy(avatars, 'rarity');
  const rarityOrder: Character['rarity'][] = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className='flex h-screen items-center justify-center py-4'>
      <div className='w-full max-w-5xl'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl font-bold text-white'>
            Character Collection
          </h1>
          <p className='text-xs text-gray-400'>
            Discover our unique collection of characters
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          {rarityOrder.map(
            rarity =>
              groupedCharacters[rarity] && (
                <RaritySection
                  key={rarity}
                  title={rarity}
                  characters={groupedCharacters[rarity]}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterGallery;
