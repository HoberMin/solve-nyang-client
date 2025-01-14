import { domain } from './character';

interface UserCharacter {
  id: number; // 고유값
  characterId: number;
  name: string;
  rarity: string;
  dropRate: number;
  visible: boolean;
}

interface UserCharacterList {
  characters: UserCharacter[];
}

interface UserInfo {
  userId: string;
  nickname: string;
  point: number;
}

export const userInfo = async () =>
  await fetch(`${domain}/user/info`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as UserInfo);

export const userCharacter = async () => {
  return await fetch(`${domain}/my/character`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as UserCharacterList);
};
