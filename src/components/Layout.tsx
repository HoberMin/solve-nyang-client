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
      className='font-neo relative min-h-screen w-screen'
      style={{
        backgroundImage: 'url("/solve-nyang-bg.png")',
        backgroundSize: '100%', // 또는 특정 크기 '390px 844px'
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
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
