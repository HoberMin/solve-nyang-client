import _ from 'lodash';

import { useGetAvatarList } from '@/apis/avatar';
import RaritySection from '@/pages/catCollection/components/RaritySection';

export interface Character {
  id: string;
  name: string;
  rarity: 'S' | 'A' | 'B' | 'C' | 'D';
}

const AvatarCollections = () => {
  const { data } = useGetAvatarList();
  const { avatars = [] } = data || {};
  const groupedCharacters = _.groupBy(avatars, 'rarity');
  const rarityOrder: Character['rarity'][] = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className='mb-[100px] hidden h-full items-center justify-center py-8 lg:flex'>
      <div className='container mx-auto max-w-3xl px-4 lg:max-w-4xl xl:max-w-5xl'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-bold text-white'>내가 모은 고양이</h2>
          <p className='text-gray-200'>현재까지 획득한 고양이 친구들이에요</p>
          <div className='mt-2 text-gray-400'>
            더 많은 고양이를 모으려면 알고리즘 문제를 풀어보세요
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

export default AvatarCollections;
