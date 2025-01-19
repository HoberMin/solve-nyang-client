import { useEffect, useState } from 'react';

import { GridConfig } from '../components/ImageCarousel';

export const useGridConfig = (): GridConfig => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width >= 1280) return { cols: 4, rows: 3, perPage: 12 }; // 더 큰 그리드로 변경
  if (windowSize.width >= 768) return { cols: 3, rows: 3, perPage: 9 };
  return { cols: 2, rows: 3, perPage: 6 };
};
