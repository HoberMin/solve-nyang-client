import { useState } from 'react';

import Layout from '@/components/Layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// 타입 정의
interface Character {
  ownedAvatarId: string;
  name: string;
  rarity: 'S' | 'A' | 'B' | 'C' | 'D';
}

type RarityColorType = {
  [key in Character['rarity']]: string;
};

const POINT_PER_CHARACTER = 100;

const dummyCharacters: Character[] = [
  { ownedAvatarId: '1', name: 'NEKO', rarity: 'S' },
  { ownedAvatarId: '2', name: 'TAMA', rarity: 'A' },
  { ownedAvatarId: '3', name: 'MOCHI', rarity: 'B' },
  { ownedAvatarId: '4', name: 'KURO', rarity: 'C' },
  { ownedAvatarId: '5', name: 'SHIRO', rarity: 'D' },
  // 중복 캐릭터 예시
  { ownedAvatarId: '6', name: 'NEKO', rarity: 'S' },
  { ownedAvatarId: '7', name: 'TAMA', rarity: 'A' },
  { ownedAvatarId: '8', name: 'TAMA', rarity: 'A' },
  { ownedAvatarId: '9', name: 'TAMA', rarity: 'A' },
];

const SalePage = () => {
  const domain = 'http://domain';
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const totalPoints = selectedCharacters.length * POINT_PER_CHARACTER;

  const handleCharacterClick = (id: string) => {
    setSelectedCharacters(prev =>
      prev.includes(id) ? prev.filter(charId => charId !== id) : [...prev, id],
    );
  };

  const handleReset = () => {
    setSelectedCharacters([]);
  };

  const handleSale = () => {
    console.log('Sold characters:', selectedCharacters);
    console.log('Total points:', totalPoints);
    setSelectedCharacters([]);
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className='mx-auto flex h-full w-full max-w-7xl flex-col py-4'>
        <div className='mb-4 text-center'>
          <h1 className='mb-1 font-mono text-xl font-bold text-amber-400 shadow-amber-400/50 drop-shadow-lg'>
            캐릭터 판매
          </h1>
          <p className='font-mono text-sm text-gray-400'>
            판매할 캐릭터를 선택하세요
          </p>
          <div className='mt-2 font-mono text-base'>
            <span className='text-gray-400'>획득 포인트: </span>
            <span className='text-amber-400'>{totalPoints}</span>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto px-1'>
          <div className='grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8'>
            {dummyCharacters.map(character => (
              <div
                key={character.ownedAvatarId}
                className={`group cursor-pointer rounded-md border p-1 transition-all hover:scale-105 ${
                  selectedCharacters.includes(character.ownedAvatarId)
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
                onClick={() => handleCharacterClick(character.ownedAvatarId)}
              >
                <div className='relative aspect-square overflow-hidden rounded-md'>
                  <img
                    src={`${domain}/${character.name}`}
                    alt={character.name}
                    className='h-full w-full object-cover'
                  />
                  {selectedCharacters.includes(character.ownedAvatarId) && (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50'>
                      <span className='font-mono text-xs text-amber-400'>
                        선택됨
                      </span>
                      <span className='mt-0.5 font-mono text-[10px] text-amber-400'>
                        +{POINT_PER_CHARACTER}P
                      </span>
                    </div>
                  )}
                </div>
                <div className='mt-1 text-center font-mono'>
                  <p className='text-xs text-white'>{character.name}</p>
                  <span
                    className={`text-[10px] ${getRarityColor(character.rarity)}`}
                  >
                    {character.rarity}등급
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-4 flex justify-center gap-3 pt-2'>
          <button
            onClick={handleReset}
            className='rounded border border-gray-700 bg-gray-800 px-3 py-1 font-mono text-xs text-gray-400 transition-colors hover:border-red-500 hover:text-red-500'
          >
            초기화
          </button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                disabled={selectedCharacters.length === 0}
                className='rounded border border-amber-400 bg-amber-400/10 px-4 py-1.5 font-mono text-sm text-amber-400 transition-colors hover:bg-amber-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-800/50 disabled:text-gray-700'
              >
                판매하기
              </button>
            </DialogTrigger>
            <DialogContent className='border-amber-400 bg-gray-900 sm:max-w-md'>
              <DialogHeader>
                <DialogTitle className='font-mono text-amber-400'>
                  판매 확인
                </DialogTitle>
                <DialogDescription className='font-mono text-gray-400'>
                  {selectedCharacters.length}개의 캐릭터를 판매하시겠습니까?
                  <br />
                  <span className='mt-2 block text-amber-400'>
                    획득 포인트: {totalPoints}P
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className='flex justify-end gap-4 pt-4'>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className='rounded px-3 py-1.5 font-mono text-sm text-gray-400 hover:text-white'
                >
                  취소
                </button>
                <button
                  onClick={handleSale}
                  className='rounded bg-amber-400 px-3 py-1.5 font-mono text-sm text-gray-900 hover:bg-amber-500'
                >
                  확인
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

const getRarityColor = (rarity: Character['rarity']): string => {
  const colors: RarityColorType = {
    S: 'text-amber-400',
    A: 'text-purple-400',
    B: 'text-blue-400',
    C: 'text-green-400',
    D: 'text-gray-400',
  };

  return colors[rarity];
};

export default SalePage;
