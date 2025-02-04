// 로그인 여부에 따른 라우터 보호
import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/hooks/useAuth';

// requireAuth가 true면 로그인 필요
// requireAuth가 false면 로그인하면 안되는 페이지(회원가입, 로그인, 비밀번호 찾기)
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
