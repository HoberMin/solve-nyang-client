import { useState } from 'react';

import { motion } from 'framer-motion';

import Layout from '@/components/Layout';

import { Footer } from './components/Footer';
import { ImageCarousel } from './components/ImageCarousel';
import { ServiceIntro } from './components/ServiceIntro';
import { useGridConfig } from './hooks/useGridConfig';

const MainPage = () => {
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
