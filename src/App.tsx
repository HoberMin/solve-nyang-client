import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import RetroError from './components/ErrorBoundary';
import { queryClient } from './lib/queryClient';
import { router } from './lib/router';

const App = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={RetroError}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default App;
