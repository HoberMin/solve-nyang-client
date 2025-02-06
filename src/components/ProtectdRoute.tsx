import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({
  element,
  requireAuth,
}: {
  element: JSX.Element;
  requireAuth: boolean;
}) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      toast.error('로그인이 필요한 서비스 입니다.', {
        description: '로그인 페이지로 이동합니다.',
      });
    }
    if (!requireAuth && isAuthenticated) {
      toast.error('이미 로그인되어 있습니다.', {
        description: '메인 페이지로 이동합니다.',
      });
    }
  }, [requireAuth, isAuthenticated]);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return element;
};
export default ProtectedRoute;
