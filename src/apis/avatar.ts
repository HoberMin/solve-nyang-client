import { useMutation } from '@tanstack/react-query';

export const domain = 'https://api.solve-nyang.com';

export interface Avatar {
  id: number; // 고유값
  avatarId: number;
  name: string;
  rarity: string;
  dropRate: number;
}

export interface AvatarList {
  avatars: Avatar[];
}

export const gachaAvatar = async (count: number) =>
  await fetch(`${domain}/gacha/draw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      count,
    }),
  })
    .then(res => res.json())
    .then(data => data as AvatarList);

export const getAvatarList = async () =>
  await fetch(`${domain}/avatar`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => data as AvatarList);

// 명세 미작성
// export const saleCharacter = async (characterList: CharacterList) =>
//   await fetch(`${domain}/todos`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       characterList,
//     }),
//   });

export const useGachaAvatarApi = () => {
  const { mutateAsync } = useMutation<AvatarList, Error, number>({
    mutationFn: (count: number) => gachaAvatar(count),
  });

  return mutateAsync;
};
