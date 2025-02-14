import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div
      className='relative flex min-h-screen w-full flex-col items-center justify-center'
      style={{
        backgroundImage: 'url("/solve-nyang-bg.png")',
        backgroundSize: '1200px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className='absolute inset-0 bg-black bg-opacity-50' />

      <div className='relative z-10 flex flex-col items-center gap-4'>
        <Loader2 className='h-12 w-12 animate-spin text-blue-300' />
        <p className='animate-pulse text-xl font-light tracking-wider text-blue-300'>
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
