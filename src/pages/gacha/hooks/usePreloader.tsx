import { useEffect, useState } from 'react';

import { BaseRarity } from '@/lib/type';

interface Avatar {
  name: string;
  rarity: BaseRarity;
}

export interface GachaResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  results: Avatar[];
  isSingleDraw?: boolean;
}

export interface BallPosition {
  left: string;
  top: string;
}

export interface SummaryItemProps {
  result: Avatar;
}

export interface SummaryViewProps {
  results: Avatar[];
  onOpenChange: (open: boolean) => void;
}

const IMAGE_CACHE = new Map<string, boolean>();

export const useImagePreloader = (imageUrls: string[]) => {
  const [isLoaded, setLoaded] = useState<boolean>(() =>
    imageUrls.every(url => IMAGE_CACHE.has(url)),
  );

  useEffect(() => {
    const uncachedUrls = imageUrls.filter(url => !IMAGE_CACHE.has(url));
    if (uncachedUrls.length === 0) {
      setLoaded(true);
      return;
    }

    let isMounted = true;

    Promise.all(
      uncachedUrls.map(url => {
        if (IMAGE_CACHE.has(url)) return Promise.resolve();

        return new Promise<void>(resolve => {
          const img = new Image();
          img.onload = () => {
            IMAGE_CACHE.set(url, true);
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${url}`);
            resolve();
          };
          img.src = url;
        });
      }),
    ).then(() => {
      if (isMounted) setLoaded(true);
    });

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return isLoaded;
};

export default useImagePreloader;
