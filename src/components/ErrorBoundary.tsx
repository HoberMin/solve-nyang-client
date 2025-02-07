import { useEffect, useState } from 'react';

import * as Sentry from '@sentry/react';
import { Cat, Home, RefreshCcw } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router-dom';

interface RouterError {
  status?: number;
  statusText?: string;
  message?: string;
}

const RetroError = () => {
  const error = useRouteError() as Error | RouterError;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const id = Sentry.captureException(error);
      setEventId(id);
    }
  }, [error]);

  const errorMessage =
    error instanceof Error
      ? error.message
      : 'status' in error && error.statusText
        ? `${error.statusText} (${error.status})`
        : '일시적인 문제가 발생했어요';

  const handleReportFeedback = () => {
    if (eventId) {
      Sentry.showReportDialog({ eventId });
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-900'>
      <div className='flex flex-col items-center justify-center px-6 text-center'>
        <div className='mb-12'>
          <Cat
            className={`h-24 w-24 text-slate-300 transition-transform duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <h1 className='mb-8 text-4xl font-bold leading-relaxed tracking-wide text-slate-200'>
          앗! 문제가 발생했어요
        </h1>

        <p className='mb-12 max-w-md text-lg leading-loose tracking-wide text-slate-300'>
          {errorMessage}
        </p>

        <div className='flex gap-4'>
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-3 rounded-lg bg-slate-800 px-8 py-4 text-slate-200 transition-colors hover:bg-slate-700'
          >
            <Home className='h-6 w-6' />
            <span className='text-lg tracking-wide'>홈으로 돌아가기</span>
          </button>

          <button
            onClick={handleRetry}
            className='flex items-center gap-3 rounded-lg bg-slate-800 px-8 py-4 text-slate-200 transition-colors hover:bg-slate-700'
          >
            <RefreshCcw className='h-6 w-6' />
            <span className='text-lg tracking-wide'>다시 시도하기</span>
          </button>
        </div>

        {eventId && (
          <button
            onClick={handleReportFeedback}
            className='mt-8 text-slate-400 underline hover:text-slate-300'
          >
            문제 리포트 보내기
          </button>
        )}
      </div>
    </div>
  );
};

export default RetroError;
