import { useGetUserInfo } from '@/apis/user';

export const useAuth = () => {
  const { data: userInfo, isLoading } = useGetUserInfo();

  if (isLoading) {
    return { isAuthenticated: false };
  }
  return {
    isAuthenticated: Boolean(userInfo?.username),
  };
};
