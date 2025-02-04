export type BackgroundKey =
  | 'Beach'
  | 'Field'
  | 'Ocean'
  | 'Sand'
  | 'Snow1'
  | 'Snow2'
  | 'Window1'
  | 'Window2'
  | 'Space';

const backgroundNames: Record<BackgroundKey, string> = {
  Beach: '해변가배경',
  Field: '들녘배경',
  Ocean: '바다배경',
  Sand: '모래배경',
  Snow1: '설원배경',
  Snow2: '눈길배경',
  Window1: '창가배경',
  Window2: '창밖배경',
  Space: '우주배경',
};

export const getKoreanName = (key: BackgroundKey): string => {
  return backgroundNames[key];
};
