import { BaseRarity, FullRarity, RarityFilterType } from '@/lib/type';

export interface RarityStyle {
  border: string;
  text: string;
  bg: string;
}

export const RARITY_CONFIG: Record<FullRarity, RarityStyle> = {
  H: { border: 'border-[#26ffc9]', text: 'text-[#26ffc9]', bg: 'bg-[#26ffc9]' },
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]', bg: 'bg-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]', bg: 'bg-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]', bg: 'bg-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]', bg: 'bg-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]', bg: 'bg-[#a663ee]' },
};

export const BASE_RARITY_ORDER: BaseRarity[] = ['S', 'A', 'B', 'C', 'D'];

export const RARITY_ORDER: FullRarity[] = ['H', 'S', 'A', 'B', 'C', 'D'];

export const RARITY_FILTER: RarityFilterType[] = [
  'ALL',
  'H',
  'S',
  'A',
  'B',
  'C',
  'D',
];
