import { useState } from 'react';

import { Cat, Puzzle } from 'lucide-react';

import { UserAvatar } from '@/apis/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Rarity } from '@/pages/sale/type';

import { AvatarGrid } from './AvatarGrid';
import { RarityFilter } from './RarityFilter';
import { styles } from './style';

interface AvatarSectionProps {
  title: string;
  avatars: UserAvatar[];
  isExtension: boolean;
}

export const AvatarSection = ({
  title,
  avatars,
  isExtension,
}: AvatarSectionProps) => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'ALL'>('ALL');

  const filteredAvatars = avatars.filter(
    avatar => selectedRarity === 'ALL' || avatar.rarity === selectedRarity,
  );

  return (
    <Card className={styles.section.card}>
      <CardHeader className={styles.section.header}>
        <div className={styles.section.titleWrapper}>
          {isExtension ? (
            <Puzzle className={cn(styles.section.icon, 'text-blue-400')} />
          ) : (
            <Cat className={cn(styles.section.icon, 'text-purple-400')} />
          )}
          <CardTitle className={styles.section.title}>{title}</CardTitle>
          <span className={styles.section.count}>({avatars.length})</span>
        </div>
        <RarityFilter
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
        />
      </CardHeader>
      <CardContent>
        <AvatarGrid avatars={filteredAvatars} />
      </CardContent>
    </Card>
  );
};
