import { createBrowserRouter } from 'react-router-dom';

import ComingSoon from '@/components/Commingsoon';
import RetroError from '@/components/ErrorBoundary';
import Root from '@/components/Root';
import AvatarImagePage from '@/pages/AvatarImage';
import Auction from '@/pages/auction';
import CatCollection from '@/pages/catCollection';
import ChangePassword from '@/pages/changePassword';
import Contest from '@/pages/contest';
import Extension from '@/pages/extension';
import FindPassword from '@/pages/findPassword';
import Gacha from '@/pages/gacha';
import Login from '@/pages/login';
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
        path: 'gallery',
        element: <CatCollection />,
      },
      {
        path: 'auction',
        element: <Auction />,
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
        path: 'extension',
        element: <Extension />,
      },
      {
        path: 'image',
        element: <AvatarImagePage />,
      },
    ],
  },
  {
    path: '*',
    element: <ComingSoon />,
  },
]);
