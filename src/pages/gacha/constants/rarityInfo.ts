interface RarityInfo {
  dropRate: string;
  color: string;
}

export const RARITY_INFO: Record<string, RarityInfo> = {
  S: { dropRate: '1', color: '#f74600' },
  A: { dropRate: '4', color: '#ffc337' },
  B: { dropRate: '30', color: '#7abf16' },
  C: { dropRate: '45', color: '#006bff' },
  D: { dropRate: '20', color: '#a663ee' },
};
