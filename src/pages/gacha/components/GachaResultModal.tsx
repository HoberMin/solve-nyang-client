import { Avatar } from '@/apis/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// import { Dialog } from '@/components/ui/dialog';

interface GachaResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  results: Avatar[];
  isSingleDraw?: boolean;
}

export const GachaResultModal = ({
  isOpen,
  onOpenChange,
  // results,
  // isSingleDraw = true,
}: GachaResultModalProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className='overflow-hidden rounded-lg border-none bg-transparent p-0 shadow-xl'>
      짠
    </DialogContent>
    {/* <DialogContent className={isSingleDraw ? '' : 'max-w-7xl'}>
      {isSingleDraw ? (
        <div className='text-center'>
          <div className='relative h-14'>
            <div className='absolute left-0 top-0 text-5xl font-extrabold text-gray-600'>
              {results[0]?.rarity.toLowerCase()}
            </div>
            <div className='absolute left-1/2 top-6 -translate-x-1/2 transform text-2xl font-black text-black'>
              {results[0]?.name}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-5 gap-4 p-4'>
            {results.map((character, index) => (
              <div key={index} className='text-center'>
                <div className='mt-2 flex content-center justify-center gap-3 text-black'>
                  <div className='font-extrabold'>{character.rarity}</div>
                  <div className='text-sm font-medium'>{character.name}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DialogContent> */}
  </Dialog>
);
