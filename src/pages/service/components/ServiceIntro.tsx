import { motion } from 'framer-motion';
import { Brain, Cat, Coins, Image } from 'lucide-react';

export const ServiceIntro = () => {
  const features = [
    {
      icon: <Brain className='h-8 w-8' />,
      title: '알고리즘 도전',
      description: 'solved.ac의 다양한 알고리즘 문제를 해결하세요',
    },
    {
      icon: <Coins className='h-8 w-8' />,
      title: '포인트 적립',
      description: '문제 해결로 획득한 포인트로 가챠를 돌려보세요',
    },
    {
      icon: <Cat className='h-8 w-8' />,
      title: '캐릭터 수집',
      description: '귀여운 고양이 캐릭터들을 모아보세요',
    },
    {
      icon: <Image className='h-8 w-8' />,
      title: '이미지 생성',
      description: '나만의 특별한 고양이 이미지를 만들어보세요',
    },
  ];

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-16'>
      <motion.div
        className='relative max-w-4xl rounded-xl p-6'
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-center'
        >
          <h2 className='mb-10 font-bold text-white'>
            알고리즘 풀고, 키우는 나만의 고양이
          </h2>
          <p className='mb-20 text-gray-300'>
            알고리즘을 풀어서 포인트를 모으고,
            <br />
            귀여운 고양이 캐릭터를 뽑아 나만의 특별한 이미지를 만들어보세요!
          </p>
        </motion.div>

        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className='rounded-lg bg-white/5 p-6 backdrop-blur-sm'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className='mb-4 text-blue-400'>{feature.icon}</div>
              <h3 className='mb-3 font-semibold text-white'>{feature.title}</h3>
              <p className='text-sm text-gray-300'>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className='mt-8 flex flex-wrap justify-center gap-6'>
          <motion.a
            href='https://solved.ac'
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            문제풀러 가기
          </motion.a>
          <motion.a
            href='/gacha'
            className='rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            캐릭터 뽑기
          </motion.a>
          <motion.a
            href='/profile'
            className='rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            이미지 만들기
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceIntro;
