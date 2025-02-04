import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { domain } from './avatar';

export interface AuthRequest {
  username: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('Request payload:', config.data); // 요청 데이터 확인
    return config;
  },
  error => Promise.reject(error),
);

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

axiosInstance.interceptors.response.use(
  response => {
    console.log('Response data:', response.data); // 응답 데이터 확인
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data); // 에러 응답 확인
    return Promise.reject(error);
  },
);
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       // localStorage.setItem('redirectPath', window.location.pathname);
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );

interface SignInResponse {
  accessToken: string;
}

// interface SignUpResponse {
//   message: string;
// }

interface AxiosResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export const signIn = async (authForm: AuthRequest) =>
  (await axiosInstance.post(
    '/account/signin',
    authForm,
  )) as AxiosResponse<SignInResponse>;

// export const signUp = async (authForm: AuthRequest) =>
//   (await axiosInstance.post(
//     '/account/signup',
//     authForm,
//   )) as AxiosResponse<SignUpResponse>;
export const signUp = async (authForm: AuthRequest) => {
  try {
    // const response = await axiosInstance.post('/account/signup', authForm);
    const response = await axios.post(`${domain}/account/signup`, authForm, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });

    console.log('Signup response:', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Signup Error:', error.response?.data);
      throw error;
    }
    throw error;
  }
};

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (authForm: AuthRequest) => signIn(authForm),
    onSuccess: response => {
      const { accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      toast.success('로그인에 성공했습니다.');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      console.error(error);
    },
  });
};

// export const useSignUp = () => {
//   const navigate = useNavigate();

//   const { mutate } = useMutation({
//     mutationFn: (formData: AuthRequest) => signUp(formData),
//     onSuccess: () => {
//       toast.success('회원가입이 완료되었습니다.');
//       navigate('/login');
//     },
//     onError: (error: AxiosError<ErrorResponse>) => {
//       toast.error(`회원가입에 실패했습니다. ${error.response?.data.message}`);
//     },
//   });

//   return mutate;
// };
export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (formData: AuthRequest) => signUp(formData),
    onSuccess: data => {
      console.log('Signup success:', data);
      toast.success('회원가입이 완료되었습니다.');
      navigate('/login');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Signup Error Full:', error);
      console.error('Error Response:', error.response?.data);

      const errorMessage = error.response?.data?.message;

      if (errorMessage?.includes('solved.ac')) {
        toast.error(
          'solved.ac 인증을 확인해주세요. 암호화키를 이름에 정확히 입력했는지 확인해주세요.',
        );
      } else if (errorMessage?.includes('이미 가입된')) {
        toast.error('이미 가입된 회원입니다.');
      } else {
        toast.error('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return mutate;
};
