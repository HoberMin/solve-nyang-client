import { useMutation } from '@tanstack/react-query';

export const domain = 'http://43.201.96.192:8080';

export interface Character {
  id: number; // 고유값
  characterId: number;
  name: string;
  rarity: string;
  dropRate: number;
}

export interface CharacterList {
  avatars: Character[];
}

export const gachaCharacter = async (count: number) =>
  await fetch(`${domain}/gacha/draw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count,
    }),
  })
    .then(res => res.json())
    .then(data => data as CharacterList);

export const getCharacterList = async () =>
  await fetch(`${domain}/character`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as CharacterList);

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

export const useGachaCharacterApi = () => {
  const { mutateAsync } = useMutation<CharacterList, Error, number>({
    mutationFn: (count: number) => gachaCharacter(count),
  });

  return mutateAsync;
};
