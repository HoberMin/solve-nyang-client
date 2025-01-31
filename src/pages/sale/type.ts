export interface HeaderSectionProps {
  point: number;
  totalPoints: number;
  selectedRarity: 'ALL' | Rarity;
  setSelectedRarity: (rarity: 'ALL' | Rarity) => void;
  rarityCounts: Record<Rarity, number>;
}

export interface RarityStyle {
  border: string;
  text: string;
}

export type Rarity = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';
