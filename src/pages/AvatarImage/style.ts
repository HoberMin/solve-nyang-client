// styles.ts
import { cn } from '@/lib/utils';

import { Rarity } from '../sale/type';

export const RARITY_COLORS = {
  H: { bg: 'bg-[#26ffc9]', text: 'text-black' },
  S: { bg: 'bg-[#f74600]', text: 'text-white' },
  A: { bg: 'bg-[#ffc337]', text: 'text-black' },
  B: { bg: 'bg-[#7abf16]', text: 'text-black' },
  C: { bg: 'bg-[#108df1]', text: 'text-white' },
  D: { bg: 'bg-[#a663ee]', text: 'text-white' },
} as const;

export const styles = {
  page: {
    container: 'container mx-auto space-y-6 px-4 md:px-8 py-8',
    section: 'space-y-4',
  },
  preview: {
    wrapper:
      'rounded-3xl  border-blue-800/50 bg-blue-950/30 p-4 transition-all duration-300',
    header:
      'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4',
    title: 'text-xl font-bold text-blue-400',
    copyButton: cn(
      'flex items-center gap-2 px-3 py-1.5',
      'rounded-lg bg-blue-500/80 hover:bg-blue-500/90',
      'text-sm font-medium text-white',
      'transition-all duration-200',
    ),
    iconButton: cn(
      'rounded-lg p-1.5',
      'bg-blue-950/50 hover:bg-blue-900/50',
      'text-blue-300 hover:text-blue-200',
      'transition-all',
    ),
    imageContainer: 'overflow-hidden rounded-3xl border-blue-800/50',
    image: 'w-full h-full object-contain bg-black/20',
  },
  backgroundSelect: {
    wrapper: 'flex items-center gap-2',
    label: 'text-sm font-medium text-blue-200',
    select: cn(
      'rounded-lg border border-blue-800/50 bg-blue-950/30',
      'px-3 py-1.5 text-sm text-blue-200',
      'focus:outline-none focus:ring-1 focus:ring-blue-500',
    ),
  },
  // styles.ts의 collection 부분
  collection: {
    section: 'rounded-xl border border-blue-800/50 bg-blue-950/30 p-6',
    header:
      'flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6',
    title: 'text-xl font-bold text-blue-400',
    grid: 'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-3',
    sectionTitle: {
      active: 'mb-4 text-xl font-medium text-emerald-400',
      inactive: 'mb-4 text-xl font-medium text-gray-400',
    },
  },
  card: {
    wrapper: (rarity: Rarity) =>
      cn(
        'relative cursor-pointer rounded-lg border p-2 transition-all',
        'hover:scale-105 hover:shadow-lg hover:brightness-110',
        {
          'border-[#26ffc9] bg-[#26ffc9]/5': rarity === 'H',
          'border-[#f74600] bg-[#f74600]/5': rarity === 'S',
          'border-[#ffc337] bg-[#ffc337]/5': rarity === 'A',
          'border-[#7abf16] bg-[#7abf16]/5': rarity === 'B',
          'border-[#108df1] bg-[#108df1]/5': rarity === 'C',
          'border-[#a663ee] bg-[#a663ee]/5': rarity === 'D',
        },
      ),
    imageContainer: 'aspect-square relative',
    image: 'w-full h-full object-contain p-1',
    rarityBadge: (rarity: Rarity) =>
      cn('absolute right-1 top-1 text-xs font-bold', {
        'text-[#26ffc9]': rarity === 'H',
        'text-[#f74600]': rarity === 'S',
        'text-[#ffc337]': rarity === 'A',
        'text-[#7abf16]': rarity === 'B',
        'text-[#108df1]': rarity === 'C',
        'text-[#a663ee]': rarity === 'D',
      }),
    name: 'mt-1 text-center text-sm font-medium text-blue-100',
  },
  filter: {
    container: 'flex gap-2',
    button: (isSelected: boolean, rarity: Rarity | 'ALL') => {
      const STYLES = {
        ALL: {
          selected: 'bg-gray-800 text-white',
          default: 'text-blue-200 hover:bg-blue-900/50',
        },
        H: {
          selected: 'bg-[#26ffc9] text-black',
          default: 'text-[#26ffc9] hover:bg-[#26ffc9]/20',
        },
        S: {
          selected: 'bg-[#f74600] text-white',
          default: 'text-[#f74600] hover:bg-[#f74600]/20',
        },
        A: {
          selected: 'bg-[#ffc337] text-black',
          default: 'text-[#ffc337] hover:bg-[#ffc337]/20',
        },
        B: {
          selected: 'bg-[#7abf16] text-black',
          default: 'text-[#7abf16] hover:bg-[#7abf16]/20',
        },
        C: {
          selected: 'bg-[#108df1] text-white',
          default: 'text-[#108df1] hover:bg-[#108df1]/20',
        },
        D: {
          selected: 'bg-[#a663ee] text-white',
          default: 'text-[#a663ee] hover:bg-[#a663ee]/20',
        },
      }[rarity];

      return cn(
        'rounded-full px-4 py-1.5 text-xs font-semibold transition-all',
        'border border-transparent bg-blue-950/50',
        'focus:outline-none focus:ring-0',
        'select-none',
        isSelected ? STYLES.selected : STYLES.default,
        isSelected && 'border-current',
      );
    },
  },
};
