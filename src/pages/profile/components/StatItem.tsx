import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}

export const StatItem = ({
  icon: Icon,
  label,
  value,
  color,
}: StatItemProps) => (
  <div className='flex items-center'>
    <Icon className={cn('mr-3 h-8 w-8', color)} />
    <div>
      <p className='text-xl text-gray-200'>{label}</p>
      <p className='text-xl font-bold text-white'>{value}</p>
    </div>
  </div>
);
