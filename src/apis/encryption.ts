import { useMutation } from '@tanstack/react-query';

import { domain } from './avatar';

interface Encryption {
  encryption: string;
}

export const getEncryption = async (nickName: string) =>
  await fetch(`${domain}/encryption`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickName,
    }),
  })
    .then(res => res.json())
    .then(data => data as Encryption);

export const postEncryption = async (nickName: string) =>
  await fetch(`${domain}/encryption`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickName,
    }),
  });

export const useGetEncryption = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (nickName: string) => getEncryption(nickName),
  });

  return mutateAsync;
};
