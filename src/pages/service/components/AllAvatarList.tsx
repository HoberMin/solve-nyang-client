import _ from 'lodash';

import { RarityType, useGetAvatarList } from '@/apis/avatar';

import RaritySection from './ServiceRaritySection';

export interface Character {
  id: string;
  name: string;
  rarity: RarityType;
}

const AllAvatarList = () => {
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

export default AllAvatarList;
