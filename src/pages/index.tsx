import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Layout from '@/components/Layout';

// Types
interface Image {
  id: number;
  url: string;
  title: string;
}

interface GridConfig {
  cols: number;
  rows: number;
  perPage: number;
}

interface ImageCarouselProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  gridConfig: GridConfig;
}

// Constants
const IMAGES: Image[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/200`, // 이미지 크기 증가
  title: `Retro Image ${i + 1}`,
}));

// Grid Configuration Hook
const useGridConfig = (): GridConfig => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width >= 1280) return { cols: 4, rows: 3, perPage: 12 }; // 더 큰 그리드로 변경
  if (windowSize.width >= 768) return { cols: 3, rows: 3, perPage: 9 };
  return { cols: 2, rows: 3, perPage: 6 };
};

const ServiceIntro = () => (
  <div className='relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-blue-900'>
    <div className='flex min-h-screen items-center justify-center px-4 py-16'>
      <motion.div
        className='relative max-w-5xl rounded-xl border-4 border-blue-500/30 bg-gray-900/90 p-8 backdrop-blur-md'
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative mb-8 overflow-hidden rounded-lg'>
          <img
            src='https://picsum.photos/200' // 이미지 크기 증가
            alt='Service Preview'
            className='w-full transition-transform duration-700 hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
        </div>

        <h2
          className='mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent'
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Retro Gaming Hub
        </h2>

        <p className='text-xl leading-relaxed text-blue-100'>
          Step into a world where classic gaming meets modern technology. Our
          platform brings together retro gaming enthusiasts, offering a unique
          space to discover, compete, and connect through the games that defined
          an era.
        </p>

        <div className='mt-8 flex flex-wrap gap-4'>
          <motion.button
            className='rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blue-600'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className='rounded-lg border-2 border-blue-500 px-6 py-3 text-lg font-semibold text-blue-500 shadow-lg transition-colors hover:bg-blue-500/10'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
);

const Footer = () => {
  const githubUsers = [
    { name: '@github_user1', url: '#' },
    { name: '@github_user2', url: '#' },
    { name: '@github_user3', url: '#' },
    { name: '@github_user4', url: '#' },
    { name: '@github_user5', url: '#' },
    { name: '@github_user6', url: '#' },
  ];

  return (
    <div className='relative min-h-screen w-full bg-gradient-to-b from-blue-900 to-gray-900'>
      <div className='flex min-h-screen flex-col justify-between p-8'>
        <motion.div
          className='mx-auto max-w-5xl text-center'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='relative mb-12 overflow-hidden rounded-xl'>
            <img
              src='https://picsum.photos/200'
              alt='Community'
              className='w-full transition-transform duration-700 hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent' />
          </div>

          <h2
            className='mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent'
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Join Our Community
          </h2>

          <p className='text-xl leading-relaxed text-blue-100'>
            Be part of a passionate community that celebrates the golden age of
            gaming. Share strategies, compete in tournaments, and make lasting
            connections with fellow retro gaming enthusiasts.
          </p>
        </motion.div>

        <motion.footer
          className='mx-auto mt-16 w-full max-w-5xl rounded-xl border-2 border-blue-500/30 bg-gray-900/90 p-8 backdrop-blur-md'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='grid gap-12 md:grid-cols-2'>
            <div>
              <h3
                className='mb-6 text-xl text-blue-400'
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Team Members
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                {githubUsers.map((user, index) => (
                  <a
                    key={index}
                    href={user.url}
                    className='text-lg text-blue-200 transition-colors duration-300 hover:text-blue-400'
                  >
                    {user.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3
                className='mb-6 text-xl text-blue-400'
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                About Service
              </h3>
              <p className='text-lg leading-relaxed text-blue-200'>
                Our mission is to preserve and celebrate retro gaming culture.
                We provide a unique platform where classic gaming enthusiasts
                can connect, compete, and share their passion for the games that
                shaped the industry.
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

const ImageSkeleton = () => (
  <div className='group relative h-40 animate-pulse overflow-hidden rounded-lg bg-gray-800/50'>
    <div className='h-full w-full bg-gray-700' />
    <div className='absolute bottom-0 left-0 right-0 h-8 bg-gray-700/50' />
  </div>
);

const ImageCard = ({ image }: { image: Image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      className='group relative h-40 overflow-hidden rounded-lg bg-gray-800'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading && <ImageSkeleton />}
      <img
        src={image.url}
        alt={image.title}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
          isLoading ? 'invisible' : 'visible'
        }`}
        onLoad={() => setIsLoading(false)}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      <div className='absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-blue-500/20 p-2 text-center backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0'>
        <p className='text-xs font-medium text-blue-100'>{image.title}</p>
      </div>
    </motion.div>
  );
};

const CarouselSlide = ({
  images,
  gridConfig,
}: {
  images: Image[];
  gridConfig: GridConfig;
}) => (
  <div
    className='grid gap-4 p-3'
    style={{
      gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${gridConfig.rows}, minmax(0, 1fr))`,
      gridAutoRows: '160px',
    }}
  >
    {images.map(image => (
      <ImageCard key={image.id} image={image} />
    ))}
    {/* Fill empty slots with skeletons */}
    {Array.from({
      length: Math.max(0, gridConfig.perPage - images.length),
    }).map((_, i) => (
      <ImageSkeleton key={`skeleton-${i}`} />
    ))}
  </div>
);

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  currentPage,
  setCurrentPage,
  gridConfig,
}) => {
  const totalPages = Math.ceil(IMAGES.length / gridConfig.perPage);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = async (newDirection: number) => {
    if (isAnimating) return;

    const nextPage = currentPage + newDirection;
    if (nextPage >= 0 && nextPage < totalPages) {
      setIsAnimating(true);
      setDirection(newDirection);
      setCurrentPage(nextPage);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className='relative min-h-screen w-full bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 pt-0'>
      <div className='flex min-h-screen items-center justify-center px-16 py-8 pt-0'>
        {/* Container for carousel and navigation buttons */}
        <div className='relative w-full max-w-6xl'>
          {/* Navigation Buttons - Moved outside the carousel container */}
          <div className='absolute -left-16 top-1/2 flex -translate-y-1/2 items-center'>
            {currentPage > 0 && (
              <motion.button
                className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/50 text-2xl text-white/75 backdrop-blur-sm transition-all hover:bg-gray-900/75 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => paginate(-1)}
                disabled={isAnimating}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
            )}
          </div>

          <div className='absolute -right-16 top-1/2 flex -translate-y-1/2 items-center'>
            {currentPage < totalPages - 1 && (
              <motion.button
                className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/50 text-2xl text-white/75 backdrop-blur-sm transition-all hover:bg-gray-900/75 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => paginate(1)}
                disabled={isAnimating}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            )}
          </div>

          {/* Main carousel container */}
          <motion.div
            className='relative w-full rounded-lg border-2 border-blue-500/30 bg-gray-900/90 p-6 backdrop-blur-md'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <div className='relative mb-4 text-center'>
              <h2
                className='mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent'
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Image Gallery
              </h2>
              <div className='absolute -inset-1 -z-10 animate-pulse rounded-lg bg-blue-500/10' />
            </div>

            {/* Carousel */}
            <div className='relative overflow-hidden'>
              <AnimatePresence
                initial={false}
                mode='wait'
                custom={direction}
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <CarouselSlide
                    images={IMAGES.slice(
                      currentPage * gridConfig.perPage,
                      (currentPage + 1) * gridConfig.perPage,
                    )}
                    gridConfig={gridConfig}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className='mt-4 flex justify-center gap-2'>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating && i !== currentPage) {
                      setDirection(i > currentPage ? 1 : -1);
                      setCurrentPage(i);
                    }
                  }}
                  disabled={isAnimating}
                  className={`group relative h-1.5 w-6 overflow-hidden rounded-full transition-colors duration-300 ${
                    i === currentPage
                      ? 'bg-blue-500'
                      : 'bg-blue-500/20 hover:bg-blue-500/40'
                  } ${isAnimating ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-label={`Page ${i + 1}`}
                >
                  <div
                    className={`absolute inset-0 bg-blue-400/30 transition-transform duration-500 ${
                      i === currentPage
                        ? 'animate-pulse'
                        : 'translate-x-full group-hover:translate-x-0'
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const MainPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const gridConfig = useGridConfig();

  return (
    <Layout>
      <motion.section className='relative'>
        <ImageCarousel
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          gridConfig={gridConfig}
        />
      </motion.section>

      <motion.section className='relative'>
        <ServiceIntro />
      </motion.section>

      <motion.section className='relative'>
        <Footer />
      </motion.section>
    </Layout>
  );
};

export default MainPage;
