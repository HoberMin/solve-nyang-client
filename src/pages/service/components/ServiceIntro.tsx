import { motion } from 'framer-motion';

export const ServiceIntro = () => (
  <div className='flex min-h-screen items-center justify-center px-4 py-16'>
    <motion.div
      className='relative max-w-5xl rounded-xl p-8'
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='relative mb-8 overflow-hidden rounded-lg'>
        <img
          src='https://picsum.photos/200'
          alt='Service Preview'
          className='w-full transition-transform duration-700 hover:scale-105'
        />
      </div>

      <h2
        className='mb-8 text-4xl font-bold'
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Retro Gaming Hub
      </h2>

      <p className='text-xl leading-relaxed'>
        Step into a world where classic gaming meets modern technology...
      </p>

      <div className='mt-8 flex flex-wrap gap-4'>
        <motion.button
          className='rounded-lg px-6 py-3 text-lg font-semibold'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
        <motion.button
          className='rounded-lg px-6 py-3 text-lg font-semibold'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  </div>
);
