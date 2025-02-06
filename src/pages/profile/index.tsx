import { useState } from 'react';

import { useGetAvatarGallery } from '@/apis/gallery';
import { useGetUserInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { RarityFilterType } from '@/lib/type';

import { CatGallery } from './components/CatGallery';
import { ProfileHeader } from './components/ProfileHeader';
import { UserStats } from './components/UserStatus';

const ProfilePage = () => {
  const { data: userInfo } = useGetUserInfo();
  const { data: avatarGallery } = useGetAvatarGallery();
  const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');

  if (!userInfo || !avatarGallery) {
    return null;
  }

  return (
    <Layout>
      <div className='mx-auto w-full max-w-6xl p-8'>
        <div className='mb-8 flex items-start justify-between'>
          <div className='flex-grow rounded-lg bg-white/10 p-12 py-8 backdrop-blur-sm'>
            <ProfileHeader username={userInfo.username} />
            <UserStats userInfo={userInfo} />
          </div>
        </div>
        <CatGallery
          collections={avatarGallery.collections}
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;
