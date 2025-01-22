import { memo } from 'react';

import { SummaryViewProps } from '../hooks/usePreloader';
import { SummaryItem } from './SummaryItem';

export const SummaryView = memo(
  ({ results, onBackdropClick }: SummaryViewProps) => (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
      onClick={onBackdropClick}
    >
      <div className='relative bg-transparent'>
        <div className='absolute left-1/2 top-[-20px] w-full -translate-x-1/2 transform'>
          <p className='animate-pulse text-center text-lg font-semibold text-white'>
            {'Press Enter'}
          </p>
        </div>
        <div className='grid grid-cols-5'>
          {results.map((result, index) => (
            <SummaryItem key={`${result.name}-${index}`} result={result} />
          ))}
        </div>
      </div>
    </div>
  ),
);

SummaryView.displayName = 'SummaryView';
