import { useState } from 'react';

import { motion } from 'framer-motion';

import { ImageSkeleton } from './ImageSkeleton';

export interface Image {
  id: number;
  url: string;
  title: string;
}

export const ImageCard = ({ image }: { image: Image }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      className='group relative h-40 overflow-hidden rounded-lg'
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
      <div className='absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center p-2 text-center backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0'>
        <p className='text-xs font-medium text-blue-100'>{image.title}</p>
      </div>
    </motion.div>
  );
};
