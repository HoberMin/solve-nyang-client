import { useGetUserInfo, useToggleAvatar } from '@/apis/user';
import Layout from '@/components/Layout';

import { AvatarCollection } from './components/AvatarCollection';
import { MyImage } from './components/MyImage';
import { styles } from './style';

const AvatarImagePage = () => {
  const { data: userInfo } = useGetUserInfo();
  const mutate = useToggleAvatar();

  return (
    <Layout>
      <div className={styles.page.container}>
        <div className='mb-12 flex flex-col items-center text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white'>
            나만의 이미지 만들기
          </h2>
          <p className='max-w-2xl text-lg text-blue-200/80'>
            뽑은 고양이와 함께 특별한 이미지를 제작해보세요!
            <br />
            GitHub README.md에 추가하여 나만의 개성을 표현할 수 있습니다.
          </p>
        </div>
        {userInfo && <MyImage username={userInfo?.username} />}
        <AvatarCollection onToggle={mutate} />
      </div>
    </Layout>
  );
};

export default AvatarImagePage;
