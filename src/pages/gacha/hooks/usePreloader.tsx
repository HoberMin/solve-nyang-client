import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

// Avatar 타입 정의 (실제 Avatar 인터페이스에 맞게 수정 필요)
interface Avatar {
  name: string;
  rarity: 'S' | 'A' | 'B' | 'C' | 'D';
  // 필요한 다른 속성들 추가
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
  onBackdropClick: (e: MouseEvent<HTMLDivElement>) => void;
}

// 이미지 캐시 관리를 위한 전역 Map
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
            // 에러 처리를 명시적으로 추가
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
