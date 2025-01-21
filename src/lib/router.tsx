// src/lib/router.tsx
import { createBrowserRouter } from 'react-router-dom';

import RetroError from '@/components/ErrorBoundary';
import Root from '@/components/Root';
import Gacha from '@/pages/gacha';
// import Login from '@/pages/Login';
// import Signup from '@/pages/Signup';
// import Index from '@/pages/index';
import Login from '@/pages/login';
import NotFoundPage from '@/pages/notFound';
import ProfilePage from '@/pages/profile';
import SalePage from '@/pages/sale';
import Service from '@/pages/service';
import Signup from '@/pages/signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RetroError />,
    children: [
      {
        index: true,
        element: <Service />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'sale',
        element: <SalePage />,
      },
      {
        path: 'gacha',
        element: <Gacha />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
