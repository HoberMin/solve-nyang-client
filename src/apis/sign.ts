import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { axiosInstance, clearAccessToken, setAccessToken } from './auth';

// import { domain } from './avatar';

export interface AuthRequest {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

// interface SignInResponse {
//   accessToken: string;
// }

interface SignUpResponse {
  accessToken: string;
}

interface AxiosResponse<T> {
  data: T;
}

export const signIn = async (authForm: AuthRequest) => {
  const response = await axiosInstance.post('/account/signin', authForm);
  setAccessToken(response.data.accessToken); // 메모리에 저장
  return response.data;
};

export const signUp = async (authForm: AuthRequest) =>
  (await axiosInstance.post(
    '/account/signup',
    authForm,
  )) as AxiosResponse<SignUpResponse>;

export const logOut = async () => {
  try {
    await axiosInstance.post('/account/logout'); // 리프래시 제거? 둘다 제거?
    clearAccessToken();

    window.location.href = '/';
  } catch (error) {
    // 에러 발생해도 클라이언트 토큰 제거?
    clearAccessToken();
    window.location.href = '/';
  }
};

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onSuccess: response => {
      setAccessToken(response.data.accessToken);
      toast.success('로그인에 성공했습니다.');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error(error);
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(`회원가입에 실패했습니다. ${error.response?.data.message}`);
    },
  });

  return mutate;
};
