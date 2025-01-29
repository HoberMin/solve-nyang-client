// components/AvatarCollection.tsx
import { useState } from 'react';

import { UserAvatar } from '@/apis/user';
import { RARITY_ORDER } from '@/pages/profile/AvatarCollection';
import { Rarity } from '@/pages/sale/type';

import { styles } from '../style';
import { AvatarCard } from './AvatarCard';
import { RarityFilter } from './RarityFilter';

interface AvatarCollectionProps {
  avatars: UserAvatar[];
  onToggle: (id: string) => void;
}

export const AvatarCollection = ({
  avatars,
  onToggle,
}: AvatarCollectionProps) => {
  const [visibleFilter, setVisibleFilter] = useState<Rarity | 'ALL'>('ALL');
  const [hiddenFilter, setHiddenFilter] = useState<Rarity | 'ALL'>('ALL');

  // 활성화/비활성화 아바타 분리
  const visibleAvatars = avatars.filter(avatar => avatar.visible);
  const hiddenAvatars = avatars.filter(avatar => !avatar.visible);

  // 각각의 등급별 카운트 계산
  const getCountsByRarity = (avatars: UserAvatar[]) => {
    return ['H', 'S', 'A', 'B', 'C', 'D'].reduce(
      (acc, rarity) => {
        acc[rarity as Rarity] = avatars.filter(a => a.rarity === rarity).length;
        return acc;
      },
      {} as Record<Rarity, number>,
    );
  };

  const visibleCounts = getCountsByRarity(visibleAvatars);
  const hiddenCounts = getCountsByRarity(hiddenAvatars);

  // 필터링 함수
  const filterAvatars = (avatars: UserAvatar[], filter: Rarity | 'ALL') =>
    avatars
      .filter(avatar => filter === 'ALL' || avatar.rarity === filter)
      .sort((a, b) => {
        // RARITY_ORDER 배열의 인덱스를 비교하여 정렬
        return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
      });

  return (
    <div className='space-y-8'>
      <section className={styles.collection.section}>
        <div className={styles.collection.header}>
          <h4 className={styles.collection.sectionTitle.active}>
            활성화된 아바타 ({visibleAvatars.length})
          </h4>
          <RarityFilter
            selectedRarity={visibleFilter}
            onRarityChange={setVisibleFilter}
            counts={visibleCounts}
          />
        </div>
        <div className={styles.collection.grid}>
          {filterAvatars(visibleAvatars, visibleFilter).map(avatar => (
            <AvatarCard
              key={avatar.ownedAvatarId}
              avatar={avatar}
              onClick={() => onToggle(avatar.ownedAvatarId)}
            />
          ))}
        </div>
      </section>

      <section className={styles.collection.section}>
        <div className={styles.collection.header}>
          <h4 className={styles.collection.sectionTitle.inactive}>
            비활성화된 아바타 ({hiddenAvatars.length})
          </h4>
          <RarityFilter
            selectedRarity={hiddenFilter}
            onRarityChange={setHiddenFilter}
            counts={hiddenCounts}
          />
        </div>
        <div className={styles.collection.grid}>
          {filterAvatars(hiddenAvatars, hiddenFilter).map(avatar => (
            <AvatarCard
              key={avatar.ownedAvatarId}
              avatar={avatar}
              onClick={() => onToggle(avatar.ownedAvatarId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
