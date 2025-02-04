import { useMutation } from '@tanstack/react-query';

import { domain } from './avatar';

interface Encryption {
  verificationCode: string;
}

export const getEncryption = async (username: string) =>
  await fetch(`${domain}/account/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then(res => res.json())
    .then(data => data as Encryption);

export const useGetEncryption = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (username: string) => getEncryption(username),
  });

  return mutateAsync;
};
