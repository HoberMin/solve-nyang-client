// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

import RetroLoading from '@/components/Loading';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RetroLoading />,
  },
]);
