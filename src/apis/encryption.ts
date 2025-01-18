import { domain } from './avatar';

interface Encryption {
  encryption: string;
}

export const getEncryption = async () =>
  await fetch(`${domain}/encryption`, {
    headers: {
      'Content-Type': 'application/json',
    },
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
