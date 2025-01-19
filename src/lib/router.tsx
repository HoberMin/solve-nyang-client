import { createBrowserRouter } from 'react-router-dom';

import Commingsoon from '@/components/Commingsoon';
import RetroError from '@/components/ErrorBoundary';
import Gacha from '@/pages/Gacha';
import NotFoundPage from '@/pages/NotFoundPage';
import SalePage from '@/pages/SalePage';
import UserPage from '@/pages/UserPage';
import Index from '@/pages/index';

export const router = createBrowserRouter([
  {
    errorElement: <RetroError />,
    children: [
      {
        path: '/',
        element: <Commingsoon />,
      },
      {
        path: '/service',
        element: <Index />,
      },
      {
        path: '/profile',
        element: <UserPage />,
      },
      {
        path: '/sale',
        element: <SalePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/gacha',
        element: <Gacha />,
      },
    ],
  },
]);
