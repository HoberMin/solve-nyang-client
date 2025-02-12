import { motion } from 'framer-motion';
import { Brain, Cat, Coins, Image } from 'lucide-react';

export const ServiceIntro = () => {
  const features = [
    {
      icon: <Brain className='h-6 w-6' />,
      title: '알고리즘 도전',
      description: 'solved.ac의 다양한 알고리즘 문제를 해결하세요',
    },
    {
      icon: <Coins className='h-6 w-6' />,
      title: '냥코인 적립',
      description: '문제 해결로 획득한 냥코인으로 가챠를 돌려보세요',
    },
    {
      icon: <Cat className='h-6 w-6' />,
      title: '캐릭터 수집',
      description: '귀여운 고양이 캐릭터들을 모아보세요',
    },
    {
      icon: <Image className='h-6 w-6' />,
      title: '이미지 생성',
      description: '나만의 특별한 고양이 이미지를 만들어보세요',
    },
  ];

  return (
    <motion.div
      className='h-full w-full p-4'
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-center'
      >
        <h2 className='mb-3 text-lg font-bold text-white'>
          알고리즘 풀고, 키우는 나만의 고양이
        </h2>
        <p className='mb-4 text-sm text-gray-300'>
          알고리즘을 풀어서 냥코인을 모으고, 귀여운 고양이 캐릭터를 뽑아 나만의
          특별한 이미지를 만들어보세요!
        </p>
      </motion.div>

      <div className='grid grid-cols-2 gap-2'>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className='rounded-lg bg-white/5 p-2 backdrop-blur-sm'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className='mb-1 text-blue-400'>{feature.icon}</div>
            <h3 className='mb-1 text-sm font-semibold text-white'>
              {feature.title}
            </h3>
            <p className='text-xs text-gray-300'>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className='mt-4 flex flex-wrap justify-center gap-2'>
        <motion.a
          href='https://solved.ac'
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          문제풀기
        </motion.a>
        <motion.a
          href='/gacha'
          className='rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          뽑기
        </motion.a>
        <motion.a
          href='/image'
          className='rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          이미지 만들기
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ServiceIntro;
