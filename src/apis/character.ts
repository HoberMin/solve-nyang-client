export const domain = 'http://43.201.96.192:8080';

interface Character {
  id: number; // 고유값
  characterId: number;
  name: string;
  rarity: string;
  dropRate: number;
}

export interface CharacterList {
  characters: Character[];
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
