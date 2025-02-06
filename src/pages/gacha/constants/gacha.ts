export interface BallPosition {
  left: string;
  top: string;
}

export interface DrawConfig {
  count: number;
  cost: number;
}

export const ANIMATION_STEPS = {
  INITIAL: 'initial', // 초기 상태
  CAPSULE: 'capsule', // 캡슐 등장
  SHAKE: 'shake', // 흔들기 애니메이션
  OPEN: 'open', // 캡슐 열기 애니메이션
  COMPLETE: 'complete', // 결과
} as const;

export type AnimationStep =
  (typeof ANIMATION_STEPS)[keyof typeof ANIMATION_STEPS];

export const RARITY_TO_IMAGE = {
  S: {
    capsule: '/ball/S1-3.svg',
    opened: '/ball/S1-4.svg',
  },
  A: {
    capsule: '/ball/A1-3.svg',
    opened: '/ball/A1-4.svg',
  },
  B: {
    capsule: '/ball/B1-3.svg',
    opened: '/ball/B1-4.svg',
  },
  C: {
    capsule: '/ball/C1-3.svg',
    opened: '/ball/C1-4.svg',
  },
  D: {
    capsule: '/ball/D1-3.svg',
    opened: '/ball/D1-4.svg',
  },
} as const;

export const ANIMATION_TIMING = {
  CAPSULE: 1000, // 캡슐 등장 시간
  SHAKE: 1000, // 흔들기 애니메이션 시간
  OPEN: 1000, // 열기 애니메이션 시간
} as const;
