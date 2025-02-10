import A_CAPSULE from '@/assets/ball/A1-3.svg';
import A_OPENED from '@/assets/ball/A1-4.svg';
import B_CAPSULE from '@/assets/ball/B1-3.svg';
import B_OPENED from '@/assets/ball/B1-4.svg';
import C_CAPSULE from '@/assets/ball/C1-3.svg';
import C_OPENED from '@/assets/ball/C1-4.svg';
import D_CAPSULE from '@/assets/ball/D1-3.svg';
import D_OPENED from '@/assets/ball/D1-4.svg';
import S_CAPSULE from '@/assets/ball/S1-3.svg';
import S_OPENED from '@/assets/ball/S1-4.svg';

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
    capsule: S_CAPSULE,
    opened: S_OPENED,
  },
  A: {
    capsule: A_CAPSULE,
    opened: A_OPENED,
  },
  B: {
    capsule: B_CAPSULE,
    opened: B_OPENED,
  },
  C: {
    capsule: C_CAPSULE,
    opened: C_OPENED,
  },
  D: {
    capsule: D_CAPSULE,
    opened: D_OPENED,
  },
} as const;

export const ANIMATION_TIMING = {
  CAPSULE: 1000, // 캡슐 등장 시간
  SHAKE: 1000, // 흔들기 애니메이션 시간
  OPEN: 1000, // 열기 애니메이션 시간
} as const;
