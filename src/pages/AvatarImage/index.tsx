import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useGetUserAvatar, useGetUserInfo, useToggleAvatar } from '@/apis/user';
import Layout from '@/components/Layout';

import { AvatarCollection } from './components/AvatarCollection';
import { MyImage } from './components/MyImage';
import { styles } from './style';

const AvatarImagePage = () => {
  const navigate = useNavigate();
  const { data: userData, isPending } = useGetUserInfo();
  const { data: avatarData } = useGetUserAvatar();
  const mutate = useToggleAvatar();

  useEffect(() => {
    if (!isPending && !userData?.username) {
      toast.error('로그인이 필요한 서비스입니다.', {
        description: '로그인 페이지로 이동합니다.',
        action: {
          label: '확인',
          onClick: () => navigate('/login'),
        },
      });
      navigate('/login');
    }
  }, [userData, isPending, navigate]);

  if (!userData?.username || !avatarData) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.page.container}>
        <div className='mb-12 flex flex-col items-center text-center'>
          <h1 className='mb-4 text-4xl font-bold text-white'>
            나만의 이미지 만들기
          </h1>
          <p className='max-w-2xl text-lg text-blue-200/80'>
            뽑은 고양이와 함께 특별한 이미지를 제작해보세요!
            <br />
            GitHub README.md에 추가하여 나만의 개성을 표현할 수 있습니다.
          </p>
        </div>
        <MyImage
          username={userData.username}
          visibleAvatars={avatarData.avatars.filter(a => a.visible).length}
        />
        <AvatarCollection avatars={avatarData.avatars} onToggle={mutate} />
      </div>
    </Layout>
  );
};

export default AvatarImagePage;
