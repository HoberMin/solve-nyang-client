import { useGetUserInfo } from '@/apis/user';

export const useAuth = () => {
  const { data: userInfo, isLoading } = useGetUserInfo();

  return { isAuthenticated: isLoading ? false : Boolean(userInfo?.username) };
};
