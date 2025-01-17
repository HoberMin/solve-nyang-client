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
    setIsMobile(window.innerWidth < 1024);
  };

  if (isMobile) {
    return <MobileBlockScreen />;
  }

  return (
    <div className='relative min-h-screen w-screen bg-[#111827]'>
      <div className='fixed top-0 z-50 w-full'>
        <Header />
      </div>
      <main className='w-full pt-14'>
        <Suspense fallback={<RetroLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
