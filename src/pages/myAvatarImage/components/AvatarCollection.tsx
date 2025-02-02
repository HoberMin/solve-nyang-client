import { useState } from 'react';

import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { useResetAvatar } from '@/apis/avatar';
import { UserAvatar, useGetUserAvatar } from '@/apis/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Rarity } from '@/pages/sale/type';

import { styles } from '../style';
import { AvatarCard } from './AvatarCard';
import { RarityFilter } from './RarityFilter';

const RARITY_ORDER = ['H', 'S', 'A', 'B', 'C', 'D'];

interface AvatarCollectionProps {
  onToggle: (id: string) => void;
}

const ResetDialog = ({
  isOpen,
  onClose,
  onReset,
}: {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='border-gray-600 bg-gray-900'>
      <DialogHeader>
        <DialogTitle className='text-xl text-red-400'>초기화 확인</DialogTitle>
        <DialogDescription className='text-base text-gray-400'>
          <div className='space-y-4'>
            <p>선택한 고양이를 초기화하시겠습니까?</p>
            <div className='rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-400'>
              <p className='font-medium'>⚠️ 주의!</p>
              <p className='mt-2'>초기화하면 모든 선택이 해제됩니다.</p>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className='flex justify-end gap-4 pt-4'>
        <button
          onClick={onClose}
          className='cursor-pointer rounded-full px-4 py-2 text-base text-gray-400 hover:text-white'
        >
          취소
        </button>
        <button
          onClick={onReset}
          className='cursor-pointer rounded-full border border-red-400 px-4 py-2 text-base text-red-400 hover:bg-red-400 hover:text-gray-900'
        >
          확인
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

const MAX_VISIBLE_AVATARS = 15;

export const AvatarCollection = ({ onToggle }: AvatarCollectionProps) => {
  const [visibleFilter, setVisibleFilter] = useState<Rarity | 'ALL'>('ALL');
  const [hiddenFilter, setHiddenFilter] = useState<Rarity | 'ALL'>('ALL');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: resetAvatar } = useResetAvatar();
  const { data: avatarData } = useGetUserAvatar();
  const avatars = avatarData.avatars;

  const visibleAvatars = avatars.filter(avatar => avatar.visible);
  const hiddenAvatars = avatars.filter(avatar => !avatar.visible);

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

  const filterAvatars = (avatars: UserAvatar[], filter: Rarity | 'ALL') =>
    avatars
      .filter(avatar => filter === 'ALL' || avatar.rarity === filter)
      .sort((a, b) => {
        return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
      });

  const handleReset = () => {
    resetAvatar();
    setIsDialogOpen(false);
  };

  const handleToggle = (id: string) => {
    const avatar = avatars.find(a => a.ownedAvatarId === id);
    if (!avatar) return;

    if (!avatar.visible && visibleAvatars.length >= MAX_VISIBLE_AVATARS) {
      toast.error(
        <>
          최대 15마리까지만 활성화할 수 있어요.
          <br />
          다른 고양이를 비활성화한 후 다시 시도해주세요!
        </>,
        {
          position: 'top-center',
          duration: 3000,
        },
      );
      return;
    }

    onToggle(id);
  };

  return (
    <div className='space-y-8'>
      <section className={styles.collection.section}>
        <div className={styles.collection.header}>
          <div className='flex items-center gap-4'>
            <h4 className={styles.collection.sectionTitle.active}>
              활성화된 고양이 ({visibleAvatars.length}/15)
            </h4>
            <button
              onClick={() => setIsDialogOpen(true)}
              className='rounded-full border-2 border-red-500 bg-red-500/10 p-2 text-red-500 outline-none transition-all hover:bg-red-500 hover:text-white'
            >
              <RotateCcw className='h-3 w-3' />
            </button>
          </div>
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
              onClick={() => handleToggle(avatar.ownedAvatarId)}
            />
          ))}
        </div>
      </section>

      <section className={styles.collection.section}>
        <div className={styles.collection.header}>
          <h4 className={styles.collection.sectionTitle.inactive}>
            비활성화된 고양이 ({hiddenAvatars.length})
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
              onClick={() => handleToggle(avatar.ownedAvatarId)}
            />
          ))}
        </div>
      </section>

      <ResetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onReset={handleReset}
      />
    </div>
  );
};
