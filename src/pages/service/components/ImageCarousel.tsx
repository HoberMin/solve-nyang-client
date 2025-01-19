import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { ImageCard } from './ImageCard';
import { ImageSkeleton } from './ImageSkeleton';

export interface Image {
  id: number;
  url: string;
  title: string;
}

export interface GridConfig {
  cols: number;
  rows: number;
  perPage: number;
}

export interface ImageCarouselProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  gridConfig: GridConfig;
}

const IMAGES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/200`,
  title: `Retro Image ${i + 1}`,
}));

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
    {Array.from({
      length: Math.max(0, gridConfig.perPage - images.length),
    }).map((_, i) => (
      <ImageSkeleton key={`skeleton-${i}`} />
    ))}
  </div>
);

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
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
    <div className='relative min-h-screen w-full pt-0'>
      <div className='flex min-h-screen items-center justify-center px-16 py-8 pt-0'>
        <div className='relative w-full max-w-6xl'>
          <div className='absolute -left-16 top-1/2 flex -translate-y-1/2 items-center'>
            {currentPage > 0 && (
              <motion.button
                className='flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/75 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
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
                className='flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/75 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
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

          <motion.div
            className='relative w-full rounded-lg p-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative mb-4 text-center'>
              <h2
                className='mb-2 text-2xl font-bold'
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Image Gallery
              </h2>
              <div className='absolute -inset-1 -z-10 animate-pulse rounded-lg' />
            </div>

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
                    i === currentPage ? 'bg-blue-500' : 'hover:bg-blue-500/40'
                  } ${isAnimating ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-label={`Page ${i + 1}`}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ${
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
