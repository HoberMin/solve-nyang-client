import { PropsWithChildren, Suspense, useEffect, useState } from 'react';

import Header from './Header';
import MobileBlockScreen from './MobileBlockScreen';
import RetroLoading from './RetroLoading';

const Layout = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 1280);
  };

  if (isMobile) {
    return <MobileBlockScreen />;
  }

  return (
    <Suspense fallback={<RetroLoading />}>
      <div
        className='relative min-h-screen w-full overflow-x-hidden bg-black font-neo'
        style={{
          backgroundImage: 'url("/solve-nyang-bg.png")',
          backgroundSize: '1200px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top',
        }}
      >
        <div className='w-full'>
          <Header />
        </div>
        <main className='min-h-[calc(100vh-64px)] w-full'>
          <div className='mx-auto max-w-full'>{children}</div>
        </main>
      </div>
    </Suspense>
  );
};

export default Layout;
