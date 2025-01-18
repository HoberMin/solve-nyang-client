import axios from 'axios';

import { domain } from './avatar';

interface SignInRequest {
  nickname: string;
  password: string;
}

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 5000, // 5초 후 자동으로 요청 중단
  withCredentials: true, // CORS 요청에서 쿠키를 포함하기 위해 필요
  headers: {
    'Contenet-Type': 'application/json',
  },
});

export const signIn = async ({ nickname, password }: SignInRequest) =>
  await axiosInstance.post('/account/signin', {
    nickname,
    password,
  });

export const signUp = async ({ nickname, password }: SignInRequest) =>
  await axiosInstance.post('/account/signup', {
    nickname,
    password,
  });
