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
    <div
      className='font-neo relative min-h-screen w-full overflow-x-hidden bg-cover bg-top bg-repeat'
      style={{
        backgroundImage: 'url("/solve-nyang-bg.png")',
        backgroundColor: '#000', // 기본 배경색
      }}
    >
      <div className='fixed top-0 z-50 w-full'>
        <Header />
      </div>
      <main className='min-h-screen w-full pt-16'>
        <div className='mx-auto max-w-full px-4 sm:px-6 lg:px-24'>
          <Suspense fallback={<RetroLoading />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;
