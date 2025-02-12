import { useState } from 'react';

import { useGetAvatarGallery } from '@/apis/gallery';
import { useGetUserSolvedacInfo } from '@/apis/user';
import Layout from '@/components/Layout';
import { RarityFilterType } from '@/lib/type';

import { CatGallery } from './components/CatGallery';

const GalleryPage = () => {
  const { data: userInfo } = useGetUserSolvedacInfo();

  const { data: avatarGallery } = useGetAvatarGallery();
  const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');

  if (!userInfo || !avatarGallery) {
    return null;
  }

  return (
    <Layout>
      <div className='mx-auto w-full max-w-6xl p-8'>
        <CatGallery
          collections={avatarGallery.collections}
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
        />
      </div>
    </Layout>
  );
};

export default GalleryPage;
