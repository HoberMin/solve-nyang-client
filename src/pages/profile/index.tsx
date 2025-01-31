import { useState } from 'react';

import { Award, Coins, Flame, Lock, Target, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useGetAvatarGallery } from '@/apis/gallery';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';
import { Rarity } from '@/pages/sale/type';

import { RarityFilter } from '../extension/components/RarityFilter';
import { getCatKorName } from '../gacha/constants/catMappings';

const rarityColors = {
  H: '#26ffc9',
  S: '#f74600',
  A: '#ffc337',
  B: '#7abf16',
  C: '#108df1',
  D: '#a663ee',
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useGetUserInfo();
  const { data: avatarGallery } = useGetAvatarGallery();
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'ALL'>('ALL');

  const filteredCollections = avatarGallery?.collections.filter(cat =>
    selectedRarity === 'ALL' ? true : cat.rarity === selectedRarity,
  );

  return (
    <Layout>
      <div className='mx-auto w-full max-w-6xl p-8'>
        <div className='mb-8 flex items-start justify-between'>
          <div className='flex-grow rounded-lg bg-white/10 p-12 py-8 backdrop-blur-sm'>
            <div className='mb-6 flex items-center'>
              <span className='mr-4 text-4xl font-bold text-white'>
                {userInfo.username}
              </span>
              <button
                onClick={() => navigate('/change')}
                className={cn(
                  'flex items-center rounded px-3 py-1.5 text-sm text-white transition',
                  'bg-gray-700 hover:bg-gray-600',
                )}
              >
                <Lock size={16} className='mr-1' />
                비밀번호 변경
              </button>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              {[
                {
                  icon: Trophy,
                  label: '티어',
                  value: userInfo.tier,
                  color: 'text-yellow-400',
                },
                {
                  icon: Coins,
                  label: '포인트',
                  value: userInfo.point,
                  color: 'text-yellow-400',
                },
                {
                  icon: Target,
                  label: '해결한 문제',
                  value: userInfo.solvedCount,
                  color: 'text-blue-400',
                },
                {
                  icon: Flame,
                  label: '최대 스트릭',
                  value: `${userInfo.streak}일`,
                  color: 'text-orange-400',
                },
              ].map((item, index) => (
                <div key={index} className='flex items-center'>
                  <item.icon className={cn('mr-3 h-8 w-8', item.color)} />
                  <div>
                    <p className='text-xl text-gray-200'>{item.label}</p>
                    <p className='text-xl font-bold text-white'>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='rounded-lg bg-white/10 p-6 backdrop-blur-sm'>
          <div className='mb-6 flex flex-col gap-4'>
            <div className='flex items-center'>
              <Award className='mr-2 h-6 w-6 text-yellow-400' />
              <h2 className='text-2xl font-bold text-white'>고양이 도감</h2>
            </div>
            <RarityFilter
              selectedRarity={selectedRarity}
              onRarityChange={setSelectedRarity}
            />
          </div>
          <div className='grid grid-cols-6 gap-4 md:grid-cols-8'>
            {filteredCollections?.map((cat, index) => (
              <div
                key={index}
                className={cn(
                  'group relative rounded-lg p-2 transition-all',
                  'bg-gray-800/50',
                )}
              >
                <div
                  className='mb-1 text-center text-xs font-bold'
                  style={{ color: rarityColors[cat.rarity] }}
                >
                  {cat.rarity}
                </div>
                <div className='relative aspect-square'>
                  <img
                    src={`/cats/${cat.name}.svg`}
                    alt={cat.name}
                    className={cn(
                      'h-full w-full rounded object-cover',
                      !cat.owned && 'opacity-50 brightness-0',
                    )}
                  />
                  <div className='mt-1 truncate text-center text-xs text-white'>
                    {getCatKorName(cat.name)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
