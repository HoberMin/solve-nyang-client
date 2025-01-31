import { ArrowUpRight, Mouse, PawPrint, Puzzle } from 'lucide-react';

import { useGetUserAvatar } from '@/apis/user';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { AvatarSection } from './components/AvatarSection';
import { styles } from './components/style';

const ExtensionPage = () => {
  const { data, isError } = useGetUserAvatar();

  if (isError) throw new Error();

  const { avatars } = data;
  const extensionAvatars = avatars.filter(avatar => avatar.visibleExtension);
  const normalAvatars = avatars.filter(avatar => !avatar.visibleExtension);

  return (
    <Layout>
      <div className={styles.page.container}>
        <div className='space-y-12 text-center'>
          <div className='space-y-4'>
            <div className='flex items-center justify-center gap-4'>
              <span className='text-3xl font-bold tracking-tight text-white'>
                솔브냥 익스텐션 <span className='text-blue-400'>!</span>
              </span>
              <Button
                variant='ghost' // 더 부드러운 스타일
                size='sm'
                className={cn(
                  'rounded-full px-4 py-1.5',
                  'text-blue-300 hover:text-blue-200',
                  'border border-blue-500/30 hover:border-blue-400/50',
                  'bg-blue-950/30 hover:bg-blue-900/50',
                  'transition-all',
                )}
                onClick={() => window.open('https://solve-nyang.com', '_blank')}
              >
                <span className='text-sm'>바로가기</span>
                <ArrowUpRight className='ml-1 h-4 w-4' />
              </Button>
            </div>
            <p className='text-xl text-blue-200/80'>
              당신의 웹서핑을 더 즐겁게, 귀여운 고양이와 함께
            </p>
          </div>
          <div className='mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3'>
            <Card className='border-0 bg-transparent transition-colors'>
              <CardContent className='flex flex-col items-center gap-4 pt-8'>
                <Puzzle className='mx-auto h-12 w-12 text-blue-400' />
                <span className='text-2xl font-bold text-white'>쉬운 설치</span>
                <p className='text-lg leading-relaxed text-blue-200/80'>
                  클릭 한 번으로 설치하고
                  <br />
                  바로 시작하세요
                </p>
              </CardContent>
            </Card>
            <Card className='border-0 bg-transparent transition-colors'>
              <CardContent className='flex flex-col items-center gap-4 pt-8'>
                <Mouse className='mx-auto h-12 w-12 text-blue-400' />
                <span className='text-2xl font-bold text-white'>어디서나</span>
                <p className='text-lg leading-relaxed text-blue-200/80'>
                  백준, 프로그래머스 등<br />
                  모든 알고리즘과 함께해요
                </p>
              </CardContent>
            </Card>

            <Card className='border-0 bg-transparent transition-colors'>
              <CardContent className='flex flex-col items-center gap-4 pt-8'>
                <PawPrint className='mx-auto h-12 w-12 text-blue-400' />
                <span className='text-2xl font-bold text-white'>
                  나만의 친구
                </span>
                <p className='text-lg leading-relaxed text-blue-200/80'>
                  원하는 고양이를 선택하고
                  <br />
                  함께 웹서핑을 즐겨보세요
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='mt-20'>
          <AvatarSection
            title='익스텐션에서 활성화된 고양이'
            avatars={extensionAvatars}
            isExtension={true}
          />
          <AvatarSection
            title='비활성화된 고양이'
            avatars={normalAvatars}
            isExtension={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ExtensionPage;
