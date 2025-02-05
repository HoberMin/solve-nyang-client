import { createBrowserRouter } from 'react-router-dom';

import RetroError from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectdRoute';
import Root from '@/components/Root';
import Auction from '@/pages/auction';
import SaleBackground from '@/pages/background';
import ChangePassword from '@/pages/changePassword';
import Contest from '@/pages/contest';
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
      // {
      //   path: 'event',
      //   element: <EventPage />,
      // },
      {
        path: 'contest',
        element: <Contest />,
      },

      // 로그인 전용
      {
        path: 'auction',
        element: <ProtectedRoute element={<Auction />} requireAuth={true} />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute element={<ProfilePage />} requireAuth={true} />
        ),
      },
      {
        path: 'sale',
        element: <ProtectedRoute element={<SalePage />} requireAuth={true} />,
      },
      {
        path: 'gacha',
        element: <ProtectedRoute element={<Gacha />} requireAuth={true} />,
      },
      {
        path: 'change',
        element: (
          <ProtectedRoute element={<ChangePassword />} requireAuth={true} />
        ),
      },
      {
        path: 'extension',
        element: (
          <ProtectedRoute element={<ExtensionPage />} requireAuth={true} />
        ),
      },
      {
        path: 'image',
        element: (
          <ProtectedRoute element={<AvatarImagePage />} requireAuth={true} />
        ),
      },
      {
        path: 'sale-background',
        element: (
          <ProtectedRoute element={<SaleBackground />} requireAuth={true} />
        ),
      },

      {
        path: 'signup',
        element: <ProtectedRoute element={<Signup />} requireAuth={false} />,
      },
      {
        path: 'login',
        element: <ProtectedRoute element={<Login />} requireAuth={false} />,
      },
      {
        path: 'find',
        element: (
          <ProtectedRoute element={<FindPassword />} requireAuth={false} />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
