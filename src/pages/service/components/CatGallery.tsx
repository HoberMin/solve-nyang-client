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

const VISIBLE_CARDS = 5;

const CharacterCard: React.FC<CharacterCardProps> = ({ name }) => {
  return (
    <div className='group relative h-[200px] w-[200px]'>
      {/* <img
        src={`/cats/ball/${rarity}1-4.svg`}
        alt={`${rarity} rank background`}
        className='absolute inset-0 h-full w-full'
      /> */}
      <img
        src={`/public/cats/Cloud.svg`}
        alt={name}
        className='absolute inset-0 m-auto h-full w-full object-contain'
      />
      {/* Hover Effect with Name */}
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <div className='flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-sm'>
          <span className='text-sm font-medium text-white'>{name}</span>
        </div>
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
    <div className='mb-[100px] flex h-full items-center justify-center py-4'>
      <div className='max-w-8xl w-full'>
        <div className='mb-8 text-center'>
          <h1 className='mb-3 text-3xl font-bold text-white'>고양이 갤러리</h1>
          <p className='text-sm text-gray-200'>
            알고리즘 문제를 풀고, 아래 고양이들을 획득해보세요!
          </p>
          <div className='mt-2 text-xs text-gray-400'>
            문제를 해결할 때마다 새로운 고양이 친구들을 만나볼 수 있어요
          </div>
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
