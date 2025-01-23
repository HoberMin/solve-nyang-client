import React, { useState } from 'react';

import _ from 'lodash';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

import { useGetAvatarList } from '@/apis/avatar';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

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
    <div className='group relative h-32 w-32 lg:h-32 lg:w-32 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40'>
      <img
        src={`/cats/${name}.svg`}
        alt={name}
        className='absolute inset-0 m-auto h-full w-full object-contain'
      />
      <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        <div className='flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-sm'>
          <span className='text-lg font-medium text-white'>
            {getCatKorName(name)}
          </span>
        </div>
      </div>
    </div>
  );
};

const RaritySection: React.FC<RaritySectionProps> = ({ title, characters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rarityTitles = {
    S: 'S등급',
    A: 'A등급',
    B: 'B등급',
    C: 'C등급',
    D: 'D등급',
  };

  const rarityColors = {
    S: `from-[#f74600]/80`,
    A: `from-[#ffc337]/80`,
    B: `from-[#7abf16]/80`,
    C: `from-[#108df1]/80`,
    D: `from-[#a663ee]`,
  };

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

const CharacterGallery: React.FC = () => {
  const { data } = useGetAvatarList();
  const { avatars = [] } = data || {};
  const groupedCharacters = _.groupBy(avatars, 'rarity');
  const rarityOrder: Character['rarity'][] = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className='mb-[100px] hidden h-full items-center justify-center py-8 lg:flex'>
      <div className='container mx-auto max-w-3xl px-4 lg:max-w-4xl xl:max-w-5xl'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-white'>고양이 도감</h2>
          <p className='text-gray-200'>
            알고리즘 문제를 풀고, 아래 고양이들을 획득해보세요!
          </p>
          <div className='mt-2 text-gray-400'>
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
