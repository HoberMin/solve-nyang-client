import { useGetAvatarGallery } from '@/apis/gallery';
import { useGetUserSolvedacInfo } from '@/apis/user';
import Layout from '@/components/Layout';

import MyImagePreview from './components/MyImagePreview';
import { ProfileHeader } from './components/ProfileHeader';
import { UserStats } from './components/UserStatus';

const ProfilePage = () => {
  const { data: userInfo } = useGetUserSolvedacInfo();

  const { data: avatarGallery } = useGetAvatarGallery();

  if (!userInfo || !avatarGallery) {
    return null;
  }

  return (
    <Layout>
      <div className='mx-auto max-w-6xl p-8'>
        <div className='mb-8 flex items-start justify-between'>
          <div className='flex-grow rounded-lg bg-white/10 p-12 py-8 backdrop-blur-sm'>
            <ProfileHeader username={userInfo.username} />
            <UserStats userInfo={userInfo} />
          </div>
        </div>

        <MyImagePreview />
      </div>
    </Layout>
  );
};

export default ProfilePage;
