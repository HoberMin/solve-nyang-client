import { useState } from 'react';

import { useGetUserAvatar, useToggleAvatar } from '@/apis/user';
import Layout from '@/components/Layout';

import {
  AvatarCollection,
  FilterType,
  Rarity,
  RarityStyle,
} from './AvatarCollection';
import { MyAvatar } from './MyAvatar';
import { PlayerInfo } from './PlayerInfo';

const FarmCollection = () => {
  const rarityConfig: Record<Rarity, RarityStyle> = {
    S: { border: 'border-yellow-400', text: 'text-yellow-400' },
    A: { border: 'border-purple-400', text: 'text-purple-400' },
    B: { border: 'border-blue-400', text: 'text-blue-400' },
    C: { border: 'border-green-400', text: 'text-green-400' },
    D: { border: 'border-gray-400', text: 'text-gray-400' },
  };

  const toggle = useToggleAvatar();
  const { data } = useGetUserAvatar();
  const { avatars } = data;
  const rarityOrder: Rarity[] = ['S', 'A', 'B', 'C', 'D'];

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set(
      avatars.filter(char => char.visible).map(char => char.ownedAvatarId),
    ),
  );

  const toggleCharacter = (id: string) => {
    const newSelected = new Set(selectedCharacters);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size >= 20) return;
      newSelected.add(id);
    }
    toggle(id);
    setSelectedCharacters(newSelected);
  };

  const filteredCharacters = avatars
    .filter(char => selectedFilter === 'ALL' || char.rarity === selectedFilter)
    .sort((a, b) => {
      const isASelected = selectedCharacters.has(a.ownedAvatarId);
      const isBSelected = selectedCharacters.has(b.ownedAvatarId);
      if (isASelected !== isBSelected) return isASelected ? -1 : 1;
      const rarityAIndex = rarityOrder.indexOf(a.rarity);
      const rarityBIndex = rarityOrder.indexOf(b.rarity);

      return rarityAIndex - rarityBIndex;
    });

  return (
    <Layout>
      <div className='h-full overflow-y-auto'>
        <div className='container mx-auto space-y-6 px-6 py-8'>
          <div className='grid gap-6 md:grid-cols-[1fr,300px]'>
            <MyAvatar />
            <PlayerInfo />
          </div>
          <AvatarCollection
            selectedCharacters={selectedCharacters}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filteredCharacters={filteredCharacters}
            toggleCharacter={toggleCharacter}
            rarityConfig={rarityConfig}
            rarityOrder={rarityOrder}
          />
        </div>
      </div>
    </Layout>
  );
};

export default FarmCollection;
