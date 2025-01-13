// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

import Commingsoon from '@/components/Commingsoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Commingsoon />,
  },
]);
