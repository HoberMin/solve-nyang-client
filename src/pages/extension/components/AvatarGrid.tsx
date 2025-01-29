import { UserAvatar } from '@/apis/user';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

import { styles } from './style';

interface AvatarGridProps {
  avatars: UserAvatar[];
}

export const AvatarGrid = ({ avatars }: AvatarGridProps) => {
  return (
    <div className={styles.grid.container}>
      {avatars.map(avatar => (
        <div
          key={avatar.ownedAvatarId}
          onClick={() => {
            console.log('Selected Avatar:', avatar);
          }}
          className={styles.grid.card(avatar.rarity)}
        >
          <div className={styles.grid.imageContainer}>
            <img
              src={`/cats/${avatar.name}.svg`}
              alt={getCatKorName(avatar.name)}
              className={styles.grid.image}
            />
            <span className={styles.grid.rarityBadge(avatar.rarity)}>
              {avatar.rarity}
            </span>
          </div>
          <div className={styles.grid.name}>{getCatKorName(avatar.name)}</div>
        </div>
      ))}
    </div>
  );
};
