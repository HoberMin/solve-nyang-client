import { createBrowserRouter } from 'react-router-dom';

import MaintenancePage from '@/pages/comingSoon';

export const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Root />,
  //   errorElement: <RetroError />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Service />,
  //     },
  //     {
  //       path: 'contest',
  //       element: <ProtectedRoute element={<Contest />} requireAuth={true} />,
  //     },
  //     {
  //       path: 'auction',
  //       element: <ProtectedRoute element={<Auction />} requireAuth={true} />,
  //     },
  //     {
  //       path: 'profile',
  //       element: (
  //         <ProtectedRoute element={<ProfilePage />} requireAuth={true} />
  //       ),
  //     },
  //     {
  //       path: 'sale',
  //       element: <ProtectedRoute element={<SalePage />} requireAuth={true} />,
  //     },
  //     {
  //       path: 'gacha',
  //       element: <ProtectedRoute element={<Gacha />} requireAuth={true} />,
  //     },
  //     {
  //       path: 'change',
  //       element: (
  //         <ProtectedRoute element={<ChangePassword />} requireAuth={true} />
  //       ),
  //     },
  //     {
  //       path: 'extension',
  //       element: (
  //         <ProtectedRoute element={<ExtensionPage />} requireAuth={true} />
  //       ),
  //     },
  //     {
  //       path: 'image',
  //       element: (
  //         <ProtectedRoute element={<AvatarImagePage />} requireAuth={true} />
  //       ),
  //     },
  //     {
  //       path: 'sale-background',
  //       element: (
  //         <ProtectedRoute element={<SaleBackground />} requireAuth={true} />
  //       ),
  //     },
  //     {
  //       path: 'signup',
  //       element: <ProtectedRoute element={<Signup />} requireAuth={false} />,
  //     },
  //     {
  //       path: 'login',
  //       element: <ProtectedRoute element={<Login />} requireAuth={false} />,
  //     },
  //     {
  //       path: 'find',
  //       element: (
  //         <ProtectedRoute element={<FindPassword />} requireAuth={false} />
  //       ),
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <MaintenancePage />,
  },
]);
