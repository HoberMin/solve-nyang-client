import { createBrowserRouter } from 'react-router-dom';

import RetroError from '@/components/ErrorBoundary';
import Root from '@/components/Root';
import Gallery from '@/pages/catCollection';
import ChangePassword from '@/pages/changePassword';
import Contest from '@/pages/contest';
import EventPage from '@/pages/event';
import ExtensionPage from '@/pages/extension';
import FindPassword from '@/pages/findPassword';
import Gacha from '@/pages/gacha';
import Login from '@/pages/login';
import AvatarImagePage from '@/pages/myAvatarImage';
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
        path: 'contest',
        element: <Contest />,
      },
      {
        path: 'find',
        element: <FindPassword />,
      },
      {
        path: 'change',
        element: <ChangePassword />,
      },
      {
        path: 'image',
        element: <AvatarImagePage />,
      },
      {
        path: 'event',
        element: <EventPage />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'extension',
        element: <ExtensionPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
