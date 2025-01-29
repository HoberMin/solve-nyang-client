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
