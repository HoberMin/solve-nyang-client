import { domain } from './character';

interface SignInRequest {
  nickname: string;
  password: string;
}

export const signIn = async ({ nickname, password }: SignInRequest) =>
  await fetch(`${domain}/account/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      password,
    }),
  });

export const signUp = async ({ nickname, password }: SignInRequest) =>
  await fetch(`${domain}/account/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      password,
    }),
  });
