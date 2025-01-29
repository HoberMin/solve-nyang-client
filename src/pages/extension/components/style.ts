import { cn } from '@/lib/utils';
import { Rarity } from '@/pages/sale/type';

export const RARITY_COLORS = {
  H: {
    color: '#26ffc9',
    text: 'text-black',
  },
  S: {
    color: '#f74600',
    text: 'text-white',
  },
  A: {
    color: '#ffc337',
    text: 'text-black',
  },
  B: {
    color: '#7abf16',
    text: 'text-black',
  },
  C: {
    color: '#108df1',
    text: 'text-white',
  },
  D: {
    color: '#a663ee',
    text: 'text-white',
  },
} as const;

export const styles = {
  page: {
    container: 'container mx-auto py-12 space-y-12 px-4', // 여백 늘리고 패딩 추가
    header: 'text-center space-y-6', // 간격 증가
    title: 'text-5xl font-bold text-white', // 크기 증가 및 색상 변경
    description: 'text-xl text-blue-200/80 max-w-2xl mx-auto', // 크기 및 색상 조정
  },
  section: {
    card: 'w-full mb-8 bg-blue-950/30 border-blue-900/50', // 반투명 배경 추가
    header: 'flex flex-row items-center justify-between px-2 ', // 좌우 패딩 추가
    titleWrapper: 'flex items-center gap-3',
    icon: 'w-6 h-6',
    title: ' font-bold text-blue-100 text-lg', // 색상 조정
    count: 'text-sm text-blue-300/70', // 색상 조정
  },
  filter: {
    container: 'flex flex-wrap gap-2',
    button: (isSelected: boolean, isAll: boolean) =>
      cn(
        'rounded-full px-4 py-1.5 text-base font-semibold transition-all', // 크기와 굵기 조정
        isSelected
          ? isAll
            ? 'bg-blue-500/80 text-white'
            : 'bg-blue-600/80 text-white'
          : 'bg-blue-950/50 text-blue-200 hover:bg-blue-900/50',
      ),
  },
  grid: {
    container:
      'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-3', // 그리드 컬럼 수 증가 및 갭 감소
    card: (rarity: Rarity) =>
      cn(
        'relative cursor-pointer rounded-lg border p-2 transition-all', // 패딩 감소
        'hover:scale-105 hover:shadow-lg hover:brightness-110', // hover 효과 개선
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
        // 위치 및 크기 조정
        'text-[#26ffc9]': rarity === 'H',
        'text-[#f74600]': rarity === 'S',
        'text-[#ffc337]': rarity === 'A',
        'text-[#7abf16]': rarity === 'B',
        'text-[#108df1]': rarity === 'C',
        'text-[#a663ee]': rarity === 'D',
      }),
    name: 'mt-1 text-center font-medium text-blue-100', // 크기 감소 및 색상 조정
  },
  loading: 'flex justify-center items-center min-h-screen',
} as const;
