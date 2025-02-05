import { Character } from '@/pages/service/components/AllAvatarList';
import AvatarCard from '@/pages/service/components/AvatarCard';

export type RarityType = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

interface RaritySectionProps {
  title: RarityType;
  characters: Character[];
}

const rarityTitles: Record<RarityType, string> = {
  H: 'H등급',
  S: 'S등급',
  A: 'A등급',
  B: 'B등급',
  C: 'C등급',
  D: 'D등급',
};

const rarityColors: Record<RarityType, string> = {
  H: 'text-[#26ffc9] border-[#26ffc9]',
  S: 'text-[#f74600] border-[#f74600]',
  A: 'text-[#ffc337] border-[#ffc337]',
  B: 'text-[#7abf16] border-[#7abf16]',
  C: 'text-[#108df1] border-[#108df1]',
  D: 'text-[#a663ee] border-[#a663ee]',
};

const RaritySection = ({ title, characters }: RaritySectionProps) => {
  return (
    <div className='mx-auto w-full max-w-5xl space-y-4'>
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center space-x-3'>
          <div className={`text-lg font-bold ${rarityColors[title]}`}>
            {rarityTitles[title]}
          </div>
          <span className='text-sm text-white/60'>({characters.length})</span>
        </div>
        <div
          className={`mx-4 h-px flex-1 ${rarityColors[title].replace('text-', 'bg-')}/20`}
        />
      </div>

      <div className='px-2'>
        <div className='grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7'>
          {characters.map(char => (
            <AvatarCard key={char.id} name={char.name} rarity={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaritySection;
