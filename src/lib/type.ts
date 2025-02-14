export type BaseRarity = 'S' | 'A' | 'B' | 'C' | 'D';

export type FullRarity = 'H' | BaseRarity;

export type RarityFilterType = FullRarity | 'ALL';

export type BackgroundKey =
  | 'Beach'
  | 'Field'
  | 'Ocean'
  | 'Sand'
  | 'Snow1'
  | 'Snow2'
  | 'Window1'
  | 'Window2'
  | 'Space'
  | 'Heart';
