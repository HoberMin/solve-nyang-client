// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

import Index from '@/pages/index';
import Commingsoon from '@/components/Commingsoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Commingsoon />,
  },
  {
    path: '/index',
    element: <Index />,
  },
]);
