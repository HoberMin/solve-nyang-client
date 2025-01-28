import { createBrowserRouter } from 'react-router-dom';

import ComingSoon from '@/components/Commingsoon';

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
  //       path: 'profile',
  //       element: <ProfilePage />,
  //     },
  //     {
  //       path: 'auction',
  //       element: <SalePage />,
  //     },
  //     {
  //       path: 'gacha',
  //       element: <Gacha />,
  //     },
  //     {
  //       path: 'signup',
  //       element: <Signup />,
  //     },
  //     {
  //       path: 'login',
  //       element: <Login />,
  //     },
  //     {
  //       path: 'contest',
  //       element: <Contest />,
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <ComingSoon />,
  },
]);
