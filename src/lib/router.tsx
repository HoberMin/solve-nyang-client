import * as Sentry from '@sentry/react';
import { createBrowserRouter } from 'react-router-dom';

import RetroError from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectdRoute';
import Root from '@/components/Root';
import { Pages } from '@/pages';

// Sentry로 래핑된 라우터 생성 함수
const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter);

export const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RetroError />,
    children: [
      {
        index: true,
        element: <Pages.ServicePage />,
      },
      {
        path: 'contest',
        element: (
          <ProtectedRoute element={<Pages.ContestPage />} requireAuth={true} />
        ),
      },
      // {
      //   path: 'auction',
      //   element: (
      //     <ProtectedRoute element={<Pages.AuctionPage />} requireAuth={true} />
      //   ),
      // },
      {
        path: 'profile',
        element: (
          <ProtectedRoute element={<Pages.ProfilePage />} requireAuth={true} />
        ),
      },
      {
        path: 'sale',
        element: (
          <ProtectedRoute element={<Pages.SalePage />} requireAuth={true} />
        ),
      },
      {
        path: 'gacha',
        element: (
          <ProtectedRoute element={<Pages.GachaPage />} requireAuth={true} />
        ),
      },
      {
        path: 'change',
        element: (
          <ProtectedRoute
            element={<Pages.ChangePasswordPage />}
            requireAuth={true}
          />
        ),
      },
      {
        path: 'extension',
        element: (
          <ProtectedRoute
            element={<Pages.ExtensionPage />}
            requireAuth={true}
          />
        ),
      },
      {
        path: 'image',
        element: (
          <ProtectedRoute
            element={<Pages.AvatarImagePage />}
            requireAuth={true}
          />
        ),
      },
      {
        path: 'sale-background',
        element: (
          <ProtectedRoute
            element={<Pages.BackgroundSalePage />}
            requireAuth={true}
          />
        ),
      },
      {
        path: 'signup',
        element: (
          <ProtectedRoute element={<Pages.SignupPage />} requireAuth={false} />
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute element={<Pages.LoginPage />} requireAuth={false} />
        ),
      },
      {
        path: 'find',
        element: (
          <ProtectedRoute
            element={<Pages.FindPasswordPage />}
            requireAuth={false}
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Pages.NotFoundPage />,
  },
]);
