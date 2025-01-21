import { motion } from 'framer-motion';

import Layout from '@/components/Layout';

import CatGallery from './components/CatGallery';
import { Footer } from './components/Footer';
import { ServiceIntro } from './components/ServiceIntro';

const MainPage = () => {
  return (
    <Layout>
      <motion.section className='relative'>
        <ServiceIntro />
      </motion.section>
      <CatGallery />
      <motion.section className='relative'>
        <Footer />
      </motion.section>
    </Layout>
  );
};

export default MainPage;
