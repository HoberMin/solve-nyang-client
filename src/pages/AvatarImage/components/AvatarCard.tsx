import { UserAvatar } from '@/apis/user';

import { styles } from '../style';

interface AvatarCardProps {
  avatar: UserAvatar;
  onClick: () => void;
}

export const AvatarCard = ({ avatar, onClick }: AvatarCardProps) => (
  <div onClick={onClick} className={styles.card.wrapper(avatar.rarity)}>
    <div className={styles.card.imageContainer}>
      <img
        src={`/cats/${avatar.name}.svg`}
        alt={avatar.name}
        className={styles.card.image}
      />
      <div className={styles.card.rarityBadge(avatar.rarity)}>
        {avatar.rarity}
      </div>
    </div>
    <div className={styles.card.name}>{avatar.name}</div>
  </div>
);
