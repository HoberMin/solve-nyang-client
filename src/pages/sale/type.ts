import { FullRarity, RarityFilterType } from '@/lib/type';

export interface HeaderSectionProps {
  totalPoints: number;
  selectedRarity: RarityFilterType;
  setSelectedRarity: (rarity: RarityFilterType) => void;
  rarityCounts: Record<FullRarity, number>;
}

export interface RarityStyle {
  border: string;
  text: string;
}
