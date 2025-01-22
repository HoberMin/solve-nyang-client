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
