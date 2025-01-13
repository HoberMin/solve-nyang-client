import { createBrowserRouter } from 'react-router-dom';

import Commingsoon from '@/components/Commingsoon';
import Index from '@/pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Commingsoon />,
  },
  {
    path: '/service',
    element: <Index />,
  },
]);
