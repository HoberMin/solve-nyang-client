import { motion } from 'framer-motion';

export const Footer = () => {
  const githubUsers = [
    { name: '@github_user1', url: '#' },
    { name: '@github_user2', url: '#' },
    // ... 나머지 사용자
  ];

  return (
    <div className='flex min-h-screen flex-col justify-between p-8'>
      <motion.div
        className='mx-auto max-w-5xl text-center'
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className='mb-8 text-3xl font-bold'
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Join Our Community
        </h2>

        <p className='text-xl leading-relaxed'>
          Be part of a passionate community...
        </p>
      </motion.div>

      <motion.footer
        className='mx-auto mt-16 w-full max-w-5xl rounded-xl p-8'
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className='grid gap-12 md:grid-cols-2'>
          <div>
            <h3
              className='mb-6 text-xl'
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Team Members
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {githubUsers.map((user, index) => (
                <a
                  key={index}
                  href={user.url}
                  className='text-lg transition-colors duration-300'
                >
                  {user.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className='mb-6 text-xl'
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              About Service
            </h3>
            <p className='text-lg leading-relaxed'>
              Our mission is to preserve and celebrate retro gaming culture...
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
