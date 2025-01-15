import { PropsWithChildren, Suspense, useEffect, useState } from 'react';

import Header from './Header';
import MobileBlockScreen from './MobileBlockScreen';
import RetroLoading from './RetroLoading';

const Layout = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 초기 화면 크기 체크
    checkScreenSize();

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', checkScreenSize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 1024); // 1280px 미만을 모바일로 간주
  };

  // 모바일이면 접근 차단 화면 표시
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
