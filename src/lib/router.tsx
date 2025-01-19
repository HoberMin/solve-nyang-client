import { createBrowserRouter } from 'react-router-dom';

import Commingsoon from '@/components/Commingsoon';
import RetroError from '@/components/ErrorBoundary';
import Gacha from '@/pages/gacha';
import Login from '@/pages/login';
import NotFoundPage from '@/pages/notFound';
import ProfilePage from '@/pages/profile';
import SalePage from '@/pages/sale';
import Service from '@/pages/service';
import Signup from '@/pages/signup';

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
        element: <Service />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
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
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
