// Layout.tsx
import { PropsWithChildren, Suspense } from 'react';

import Header from './Header';
import RetroLoading from './RetroLoading';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='relative min-h-screen w-screen bg-[#111827]'>
      {/* 헤더를 fixed로 변경하고 z-index 추가 */}
      <div className='fixed top-0 z-50 w-full'>
        <Header />
      </div>

      {/* main 영역에 상단 패딩 추가 */}
      <main className='h-screen w-full pt-14'>
        <Suspense fallback={<RetroLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
