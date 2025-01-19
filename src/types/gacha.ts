// src/types/gacha.ts
export interface BallPosition {
  left: string;
  top: string;
}

export interface RarityInfo {
  rarity: string;
  dropRate: string;
}

export interface DrawConfig {
  count: number;
  cost: number;
}
