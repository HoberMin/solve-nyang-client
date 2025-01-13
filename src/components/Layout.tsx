// RootLayout.jsx
import { PropsWithChildren, Suspense } from 'react';

import Header from './Header';
import RetroLoading from './RetroLoading';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen w-screen bg-[#111827]'>
      <Header />
      <main className='h-[calc(100vh-3.5rem)] w-full'>
        <Suspense fallback={<RetroLoading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default RootLayout;
