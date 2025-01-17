import { createBrowserRouter } from 'react-router-dom';

import Commingsoon from '@/components/Commingsoon';
import NotFoundPage from '@/pages/NotFoundPage';
import SalePage from '@/pages/SalePage';
import UserPage from '@/pages/UserPage';
import Index from '@/pages/index';

// 방금 만든 404 컴포넌트를 import 합니다

export const router = createBrowserRouter([
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
    path: '*', // 위의 모든 경로와 매칭되지 않는 경우 404 페이지로 이동
    element: <NotFoundPage />,
  },
]);
