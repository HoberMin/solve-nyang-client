import { useState } from 'react';

import { Check, Copy } from 'lucide-react';
import { BookOpen, Flame, Star, Target, Trophy } from 'lucide-react';
import { toast } from 'sonner';

import { UserAvatar, useGetUserAvatar, useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

export type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';

interface RarityStyle {
  border: string;
  text: string;
}

type FilterType = 'ALL' | Rarity;

const getTierInfo = (tier: number) => {
  const tiers = [
    { name: 'Bronze', color: 'text-[#CD7F32]', range: [1, 5] },
    { name: 'Silver', color: 'text-gray-300', range: [6, 10] },
    { name: 'Gold', color: 'text-yellow-500', range: [11, 15] },
    { name: 'Platinum', color: 'text-blue-300', range: [16, 20] },
    { name: 'Diamond', color: 'text-cyan-400', range: [21, 25] },
    { name: 'Ruby', color: 'text-red-500', range: [26, 30] },
  ];

  const currentTier =
    tiers.find(t => tier >= t.range[0] && tier <= t.range[1]) || tiers[0];

  return {
    name: `${currentTier.name} ${tier}`,
    color: currentTier.color,
  };
};

const PlayerInfo = () => {
  const { data } = useGetUserInfo();
  const { nickname, point, solvedacTier, solvedCount, solvedacStrick } = data;

  const tierInfo = getTierInfo(solvedacTier);

  return (
    <div className='group relative overflow-hidden rounded-2xl border border-white/20 bg-gray-900/70 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl'>
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 mix-blend-overlay transition-all duration-300 group-hover:opacity-30'></div>

      {/* Sparkling effect */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className='absolute animate-ping rounded-full bg-white/20 opacity-50'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <h2 className='font-pixel mb-4 text-center text-xl uppercase tracking-widest text-blue-400'>
          Player Profile
        </h2>

        <div className='mb-4 flex items-center justify-center'>
          <p className='flex items-center gap-2 text-2xl font-bold text-blue-200 sm:text-3xl'>
            <Target className='h-5 w-5 text-blue-400 sm:h-6 sm:w-6' />
            {nickname}
          </p>
        </div>

        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10'>
            <Star className={`h-6 w-6 ${tierInfo.color}`} />
            <div>
              <p className='text-xs text-gray-400 sm:text-sm'>Tier</p>
              <p className={`text-sm font-bold sm:text-base ${tierInfo.color}`}>
                {tierInfo.name}
              </p>
            </div>
          </div>

          <div className='flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10'>
            <Trophy className='h-6 w-6 text-yellow-400' />
            <div>
              <p className='text-xs text-gray-400 sm:text-sm'>Points</p>
              <p className='text-sm font-bold text-yellow-300 sm:text-base'>
                {point}
              </p>
            </div>
          </div>

          <div className='flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10'>
            <BookOpen className='h-6 w-6 text-green-400' />
            <div>
              <p className='text-xs text-gray-400 sm:text-sm'>
                Solved Problems
              </p>
              <p className='text-sm font-bold text-green-300 sm:text-base'>
                {solvedCount}
              </p>
            </div>
          </div>

          <div className='flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10'>
            <Flame className='h-6 w-6 text-red-400' />
            <div>
              <p className='text-xs text-gray-400 sm:text-sm'>Current Streak</p>
              <p className='text-sm font-bold text-red-300 sm:text-base'>
                {solvedacStrick} days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyFarm = () => {
  const userName = 'sonhomin98';
  const [isCopied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const imgTag = `<img src="domain/${userName}" />`;
      await navigator.clipboard.writeText(imgTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('이미지 태그가 복사되었습니다.');
    } catch (err) {
      toast.error('복사에 실패했습니다.');
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className='rounded-xl border border-white/10 bg-gray-800/40 p-6 backdrop-blur-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='font-pixel text-lg text-blue-400'>MY FARM</h2>
        <button
          onClick={handleCopy}
          className='group flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500 hover:text-white'
        >
          <Copy className='h-4 w-4' />
          <span className='relative'>
            {isCopied ? 'Copied!' : 'Copy Image Tag'}
            {isCopied && (
              <span className='animate-progress absolute bottom-0 left-0 h-0.5 w-full bg-white' />
            )}
          </span>
        </button>
      </div>

      <div className='max-h-[300px] overflow-hidden rounded-lg border border-white/10'>
        <div className='group relative'>
          <img
            src={`domain/${userName}`}
            alt='Farm Preview'
            width={600}
            height={300}
            className='w-full transition-transform duration-300 group-hover:scale-105'
            style={{
              objectFit: 'cover',
            }}
          />

          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          <div className='absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <div className='h-2 w-2 rounded-full bg-green-400' />
            Active
          </div>
        </div>
      </div>
    </div>
  );
};

interface CharacterCollectionProps {
  selectedCharacters: Set<string>;
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filteredCharacters: UserAvatar[];
  toggleCharacter: (id: string) => void;
  rarityConfig: Record<Rarity, RarityStyle>;
  rarityOrder: Rarity[];
}

const CharacterCollection = ({
  selectedCharacters,
  selectedFilter,
  setSelectedFilter,
  filteredCharacters,
  toggleCharacter,
  rarityConfig,
  rarityOrder,
}: CharacterCollectionProps) => (
  <div className='rounded-xl border border-white/10 bg-gray-800/40 p-6 backdrop-blur-sm'>
    <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex items-center gap-4'>
        <h2 className='font-pixel text-lg text-blue-400'>
          CHARACTER COLLECTION
        </h2>
        <div className='flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1'>
          <div className='flex items-baseline gap-1 text-sm'>
            <span className='font-medium text-blue-400'>
              {selectedCharacters.size}
            </span>
            <span className='text-blue-400/70'>/</span>
            <span className='text-blue-400/70'>20</span>
          </div>
        </div>
        <span className='text-sm text-blue-400/70'>
          {20 - selectedCharacters.size} slots remaining
        </span>
      </div>

      <div className='flex flex-wrap gap-2'>
        {(['ALL' as const, ...rarityOrder] as const).map(rarity => (
          <button
            key={rarity}
            onClick={() => setSelectedFilter(rarity)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              selectedFilter === rarity
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-700/50 text-blue-400 hover:bg-gray-700/80',
            )}
          >
            {rarity}
          </button>
        ))}
      </div>
    </div>

    <div className='grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'>
      {filteredCharacters.map(char => {
        const isSelected = selectedCharacters.has(char.ownedAvatarId);
        const rarity = rarityConfig[char.rarity];

        return (
          <div
            key={char.ownedAvatarId}
            onClick={() => toggleCharacter(char.ownedAvatarId)}
            className={cn(
              'relative cursor-pointer rounded-lg border-2',
              'transition-colors duration-200',
              rarity.border,
              isSelected ? 'bg-gray-700' : 'bg-gray-800/50',
            )}
          >
            <img
              src={char.name}
              alt={char.name}
              className='aspect-square w-full rounded-lg object-contain p-2'
            />

            <div
              className={cn(
                'absolute right-1 top-1',
                'flex h-5 w-5 items-center justify-center rounded-full',
                isSelected ? 'bg-blue-500' : 'bg-gray-600',
              )}
            >
              <Check className='h-3 w-3 text-white' />
            </div>

            <div
              className={cn(
                'absolute left-1 top-1',
                'rounded px-1.5 py-0.5 text-xs font-medium',
                'bg-gray-900',
                rarity.text,
              )}
            >
              {char.rarity}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Main Container Component
const FarmCollection = () => {
  const rarityConfig: Record<Rarity, RarityStyle> = {
    S: { border: 'border-yellow-400', text: 'text-yellow-400' },
    A: { border: 'border-purple-400', text: 'text-purple-400' },
    B: { border: 'border-blue-400', text: 'text-blue-400' },
    C: { border: 'border-green-400', text: 'text-green-400' },
    D: { border: 'border-gray-400', text: 'text-gray-400' },
  };

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
    setSelectedCharacters(newSelected);
  };

  const filteredCharacters = avatars
    .filter(char => selectedFilter === 'ALL' || char.rarity === selectedFilter)
    .sort((a, b) => {
      const isASelected = selectedCharacters.has(a.ownedAvatarId);
      const isBSelected = selectedCharacters.has(b.ownedAvatarId);

      if (isASelected !== isBSelected) {
        return isASelected ? -1 : 1;
      }

      const rarityAIndex = rarityOrder.indexOf(a.rarity);
      const rarityBIndex = rarityOrder.indexOf(b.rarity);

      return rarityAIndex - rarityBIndex;
    });

  return (
    <Layout>
      <div className='h-full overflow-y-auto bg-gray-900/30'>
        <div className='container mx-auto space-y-6 px-6 py-8'>
          <div className='grid gap-6 md:grid-cols-[1fr,300px]'>
            <MyFarm />
            <PlayerInfo />
          </div>
          <CharacterCollection
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
