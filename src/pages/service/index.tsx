import { motion } from 'framer-motion';
import { Brain, Cat, Code } from 'lucide-react';

import ExtensionImg from '@/assets/banner/Extension.png';
import GachaImg from '@/assets/banner/Gacha.png';
import ValentineImg from '@/assets/banner/ValentineEvent.png';
import ReadmeImg from '@/assets/readme_example.png';
import Layout from '@/components/Layout';

import Footer from './components/Footer';

const MainPage = () => {
  const features = [
    {
      icon: <Brain className='h-8 w-8' />,
      title: '알고리즘 도전',
      description: 'solved.ac의 다양한 알고리즘 문제를 해결하고 성장하세요',
    },
    {
      icon: <Cat className='h-8 w-8' />,
      title: '캐릭터 수집',
      description:
        '문제를 풀어 획득한 포인트로 귀여운 고양이 캐릭터를 수집하세요',
    },
    {
      icon: <Code className='h-8 w-8' />,
      title: 'README 꾸미기',
      description: '수집한 캐릭터로 나만의 특별한 GitHub 프로필을 꾸며보세요',
    },
  ];

  const newCharacters = [
    {
      name: '리액트냥',
      rarity: 'B',
      imageUrl: '/cats/ReactCat.svg',
    },
    {
      name: '노드냥',
      rarity: 'B',
      imageUrl: '/cats/NodeCat.svg',
    },
    {
      name: '장고냥',
      rarity: 'B',
      imageUrl: '/cats/DjangoCat.svg',
    },
    {
      name: '코틀린냥',
      rarity: 'B',
      imageUrl: '/cats/KotlinCat.svg',
    },
    {
      name: '스위프트냥',
      rarity: 'B',
      imageUrl: '/cats/SwiftCat.svg',
    },
    {
      name: '뷰냥',
      rarity: 'B',
      imageUrl: '/cats/VueCat.svg',
    },
    {
      name: '러스트냥',
      rarity: 'B',
      imageUrl: '/cats/RustCat.svg',
    },
  ];

  const contentSections = [
    {
      title: '고양이 뽑기',
      description:
        '솔브냥의 귀여운 고양이 아바타를 뽑아보세요! 찌글한 매력이 돋보이는 D등급부터 화려한 S등급까지, 다양한 고양이들을 수집하며 나만의 컬렉션을 완성해 보세요.',
      image: GachaImg,
      buttonText: '뽑기 하러가기',
      buttonColor: 'bg-purple-500 hover:bg-purple-600 hover:text-white',
      link: '/gacha',
      imagePosition: 'left',
    },
    {
      title: '솔브냥 익스텐션',
      description:
        '크롬 익스텐션을 설치하고 브라우저 속 고양이들과 함께 웹서핑을 즐겨보세요! 화면 곳곳을 돌아다니는 귀여운 고양이들이 당신의 웹서핑을 더욱 재미있게 만들어 줄 거예요.',
      image: ExtensionImg,
      buttonText: '익스텐션 설치하기',
      buttonColor: 'bg-blue-500 hover:bg-blue-600 hover:text-white',
      link: '/extension',
      imagePosition: 'right',
    },
    {
      title: 'README 꾸미기',
      description:
        '수집한 고양이 아바타로 나만의 특별한 GitHub README를 꾸며보세요. 당신만의 독특한 프로필을 만들어서 다른 개발자들과 차별화된 인상을 남겨보세요.',
      image: ReadmeImg,
      buttonText: '나만의 이미지 만들기',
      buttonColor: 'bg-green-500 hover:bg-green-600 hover:text-white',
      link: '/image',
      imagePosition: 'left',
    },
    {
      title: '발렌타인데이 이벤트',
      description:
        '발렌타인데이 한정 이벤트에 참여하고 특별한 고양이 아바타를 획득하세요! 오직 이벤트 기간 동안만 만날 수 있는 한정판 캐릭터들을 놓치지 마세요.',
      image: ValentineImg,
      buttonText: '이벤트 참여하러 가기',
      buttonColor: 'bg-pink-500 hover:bg-pink-600 hover:text-white',
      link: '/valentine',
      imagePosition: 'right',
    },
  ];

  return (
    <Layout>
      {/* 서비스 소개 섹션 */}
      <section className='flex min-h-screen items-center justify-center px-4 py-16'>
        <motion.div
          className='relative max-w-4xl rounded-xl p-6'
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='text-center'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className='mb-10 text-4xl font-bold text-white'>
              알고리즘 풀고, 키우는 나만의 고양이
            </h2>
            <p className='mb-20 text-lg text-gray-300'>
              Solved.ac 문제를 풀고 모은 냥코인으로 귀여운 고양이 아바타를 뽑아
              <br />
              나만의 특별한 GitHub README를 꾸며보세요!
            </p>
          </motion.div>

          <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className='rounded-lg border border-white/20 p-6'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className='mb-4 text-blue-400'>{feature.icon}</div>
                <h3 className='mb-3 font-semibold text-white'>
                  {feature.title}
                </h3>
                <p className='text-sm text-gray-300'>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 신 캐릭터 소개 섹션 */}
      <section className='flex min-h-screen items-center justify-center px-4 py-16'>
        <motion.div
          className='relative max-w-4xl rounded-xl p-6'
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='text-center'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='mb-10 text-3xl font-bold text-white'>
              새로운 아바타 업데이트 !
            </h2>
          </motion.div>

          <div className='mb-12 grid grid-cols-4 gap-1 md:grid-cols-6 lg:grid-cols-7'>
            {newCharacters.map((character, index) => (
              <motion.div
                key={character.name}
                className='text-center'
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className='mx-auto h-36 w-36 rounded-full'
                />
                <h3 className='text-lg font-semibold text-white'>
                  {character.name}
                </h3>
                <span className='rounded text-sm font-bold text-[#7abf16]'>
                  {character.rarity} 등급
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      {contentSections.map(section => (
        <section
          key={section.title}
          className='flex min-h-screen items-center justify-center px-4 py-16'
        >
          <div className='relative w-full max-w-5xl'>
            <div
              className={`flex flex-col items-center gap-8 md:flex-row ${
                section.imagePosition === 'right' ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Text Content */}
              <motion.div
                className='flex-1 text-center md:text-left'
                initial={{
                  x: section.imagePosition === 'right' ? -100 : 100,
                  opacity: 0,
                }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <h2 className='mb-6 text-3xl font-bold text-white'>
                  {section.title}
                </h2>
                <p className='mb-8 text-lg text-gray-300'>
                  {section.description}
                </p>
                <a
                  href={section.link}
                  className={`inline-block rounded-lg px-6 py-3 font-semibold text-white transition-colors ${section.buttonColor}`}
                >
                  {section.buttonText}
                </a>
              </motion.div>

              {/* Image */}
              <motion.div
                className='flex-1'
                initial={{
                  x: section.imagePosition === 'right' ? 100 : -100,
                  opacity: 0,
                }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className='w-full rounded-xl border border-white/20'
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </Layout>
  );
};

export default MainPage;
