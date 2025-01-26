import { useState } from 'react';

import { Check, RotateCcw } from 'lucide-react';

import { useResetAvatar } from '@/apis/avatar';
import { useGetUserAvatar, useToggleAvatar } from '@/apis/user';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

import { Rarity } from '../sale/type';

type FilterType = 'ALL' | Rarity;

const RARITY_ORDER: Rarity[] = ['H', 'S', 'A', 'B', 'C', 'D'];
const MAX_VISIBLE_CHARACTERS = 15;

const RARITY_CONFIG = {
  H: {
    bgColor: 'bg-[#26ffc9]',
    borderColor: 'border-[#26ffc9]',
    textColor: 'text-black',
  },
  S: {
    bgColor: 'bg-[#f74600]',
    borderColor: 'border-[#f74600]',
    textColor: 'text-white',
  },
  A: {
    bgColor: 'bg-[#ffc337]',
    borderColor: 'border-[#ffc337]',
    textColor: 'text-black',
  },
  B: {
    bgColor: 'bg-[#7abf16]',
    borderColor: 'border-[#7abf16]',
    textColor: 'text-black',
  },
  C: {
    bgColor: 'bg-[#108df1]',
    borderColor: 'border-[#108df1]',
    textColor: 'text-white',
  },
  D: {
    bgColor: 'bg-[#a663ee]',
    borderColor: 'border-[#a663ee]',
    textColor: 'text-white',
  },
} as const;

const styles = {
  container: 'rounded-xl border p-6',
  header: 'mb-6 grid min-w-[1080px] grid-cols-[auto_1fr] items-center gap-4',
  title: 'text-lg font-bold text-blue-400',
  statusContainer: 'flex items-center gap-3',
  counterWrapper: 'flex items-center gap-2 rounded-full px-3 py-1.5',
  counterNumber: 'text-base font-medium text-blue-400',
  counterText: 'text-base text-blue-400/70',
  slotsText: 'text-sm text-blue-400/70',
  resetButton:
    'ml-2 rounded-full border-2 border-red-500 bg-red-500/10 p-2 text-red-500 outline-none transition-all hover:bg-red-500 hover:text-white',
  filterContainer: 'flex flex-wrap items-center justify-end gap-1.5',
  grid: 'grid grid-cols-4 gap-3 md:grid-cols-5 lg:grid-cols-7',
  rarityButton: (isSelected: boolean, rarity: FilterType) =>
    cn(
      'rounded-full px-3 py-1 text-xs font-medium outline-none transition-all focus:border-none focus:shadow-none focus:outline-none focus:ring-0',
      isSelected
        ? rarity === 'ALL'
          ? 'bg-black text-white'
          : `${RARITY_CONFIG[rarity as Rarity].bgColor} ${RARITY_CONFIG[rarity as Rarity].textColor}`
        : 'text-blue-400',
    ),
  rarityCount: (isSelected: boolean, rarity: FilterType) =>
    cn(
      'ml-1',
      isSelected
        ? rarity === 'ALL'
          ? 'text-white'
          : RARITY_CONFIG[rarity as Rarity].textColor
        : 'text-gray-500',
    ),
  avatarCard: {
    wrapper: 'group relative cursor-pointer',
    container: (isSelected: boolean, rarity: Rarity) =>
      cn(
        'relative rounded-lg border-2',
        'transition-colors duration-200',
        RARITY_CONFIG[rarity].borderColor,
        isSelected ? 'bg-gray-700' : '',
      ),
    image: 'aspect-square w-full rounded-lg object-contain p-2.5',
    checkbox: (isVisible: boolean) =>
      cn(
        'absolute right-1.5 top-1.5',
        'flex h-5 w-5 items-center justify-center rounded-full',
        isVisible ? 'bg-blue-500' : 'bg-gray-600',
      ),
    rarityBadge: (rarity: Rarity) =>
      cn(
        'absolute left-1.5 top-1.5',
        'rounded px-1.5 py-0.5 text-xs font-medium',
        RARITY_CONFIG[rarity].textColor,
        RARITY_CONFIG[rarity].bgColor,
      ),
    hover:
      'absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100',
    hoverContent:
      'flex h-full w-full items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm',
    hoverText: 'text-lg font-medium text-white',
  },
};

interface AvatarData {
  ownedAvatarId: string;
  name: string;
  rarity: Rarity;
  visible: boolean;
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

const AvatarCard = ({
  avatar,
  onToggle,
}: {
  avatar: AvatarData;
  onToggle: (id: string) => void;
}) => (
  <div
    onClick={() => onToggle(avatar.ownedAvatarId)}
    className={styles.avatarCard.wrapper}
  >
    <div className={styles.avatarCard.container(avatar.visible, avatar.rarity)}>
      <img
        src={`/cats/${avatar.name}.svg`}
        alt={avatar.name}
        className={styles.avatarCard.image}
      />
      <div className={styles.avatarCard.checkbox(avatar.visible)}>
        <Check className='h-[8px] w-[8px] text-white' />
      </div>
      <div className={styles.avatarCard.rarityBadge(avatar.rarity)}>
        {avatar.rarity}
      </div>
    </div>
    <div className={styles.avatarCard.hover}>
      <div className={styles.avatarCard.hoverContent}>
        <span className={styles.avatarCard.hoverText}>
          {getCatKorName(avatar.name)}
        </span>
      </div>
    </div>
  </div>
);

export const AvatarCollection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');
  const { data, isError } = useGetUserAvatar();
  const mutate = useToggleAvatar();
  const { mutate: resetAvatar } = useResetAvatar();

  if (isError) throw new Error();

  const { avatars } = data;
  const visibleCharacters = avatars.filter(char => char.visible);

  const toggleCharacter = (id: string) => {
    if (
      visibleCharacters.length >= MAX_VISIBLE_CHARACTERS &&
      !visibleCharacters.find(char => char.ownedAvatarId === id)
    )
      return;
    mutate(id);
  };

  const rarityCounts = RARITY_ORDER.reduce(
    (counts, rarity) => {
      counts[rarity] = avatars.filter(char => char.rarity === rarity).length;
      return counts;
    },
    {} as Record<Rarity, number>,
  );

  const filteredCharacters = avatars
    .filter(char => selectedFilter === 'ALL' || char.rarity === selectedFilter)
    .sort((a, b) => {
      if (a.visible !== b.visible) return a.visible ? -1 : 1;
      return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.statusContainer}>
          <h3 className={styles.title}>Avatar COLLECTION</h3>
          <div className={styles.counterWrapper}>
            <div className='flex items-baseline gap-1'>
              <span className={styles.counterNumber}>
                {visibleCharacters.length}
              </span>
              <span className={styles.counterText}>/</span>
              <span className={styles.counterText}>
                {MAX_VISIBLE_CHARACTERS}
              </span>
            </div>
          </div>
          <span className={styles.slotsText}>
            {MAX_VISIBLE_CHARACTERS - visibleCharacters.length} slots remaining
          </span>
          <button
            onClick={() => setIsDialogOpen(true)}
            className={styles.resetButton}
          >
            <RotateCcw className='h-4 w-4' />
          </button>
        </div>

        <div className={styles.filterContainer}>
          {(['ALL', ...RARITY_ORDER] as const).map(rarity => (
            <button
              key={rarity}
              onClick={() => setSelectedFilter(rarity)}
              className={styles.rarityButton(selectedFilter === rarity, rarity)}
            >
              {rarity}
              <span
                className={styles.rarityCount(
                  selectedFilter === rarity,
                  rarity,
                )}
              >
                (
                {rarity === 'ALL'
                  ? Object.values(rarityCounts).reduce(
                      (acc, curr) => acc + curr,
                      0,
                    )
                  : rarityCounts[rarity] || 0}
                )
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredCharacters.map(char => (
          <AvatarCard
            key={char.ownedAvatarId}
            avatar={char}
            onToggle={toggleCharacter}
          />
        ))}
      </div>

      <ResetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onReset={() => {
          resetAvatar();
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};
