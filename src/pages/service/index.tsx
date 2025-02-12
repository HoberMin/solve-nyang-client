import { motion } from 'framer-motion';

import Layout from '@/components/Layout';

import { Footer } from './components/Footer';
// import CatGallery from './components/AllAvatarList';
import Introduce from './components/Introduce';
import ReadMeExample from './components/ReadMeExample';

// import { ServiceIntro } from './components/ServiceIntro';

const MainPage = () => {
  return (
    <Layout>
      {/* <CatGallery /> */}
      <Introduce />
      <motion.section className='relative'>
        {/* <ServiceIntro /> */}
      </motion.section>
      <motion.section className='relative'>
        <ReadMeExample />
      </motion.section>
      <motion.section className='relative'>
        <Footer />
      </motion.section>
    </Layout>
  );
};

export default MainPage;
