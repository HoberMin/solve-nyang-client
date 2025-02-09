import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FullRarity, RarityFilterType } from '@/lib/type';

interface FilterSidebarProps {
  inputValue: string;
  selectedRarity: RarityFilterType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onRarityChange: (value: FullRarity) => void;
}
const FilterSidebar = ({
  inputValue,
  selectedRarity,
  onInputChange,
  onSearch,
  onRarityChange,
}: FilterSidebarProps) => {
  return (
    <div className='w-full space-y-4'>
      <form onSubmit={onSearch} className='flex gap-4'>
        <div className='w-32'>
          <Select value={selectedRarity} onValueChange={onRarityChange}>
            <SelectTrigger className='h-12 w-full border-transparent bg-gray-900 text-gray-200'>
              <SelectValue placeholder='등급' />
            </SelectTrigger>
            <SelectContent className='border-transparent bg-gray-900 text-gray-200'>
              <SelectItem value='ALL'>전체</SelectItem>
              <SelectItem value='H'>H등급</SelectItem>
              <SelectItem value='S'>S등급</SelectItem>
              <SelectItem value='A'>A등급</SelectItem>
              <SelectItem value='B'>B등급</SelectItem>
              <SelectItem value='C'>C등급</SelectItem>
              <SelectItem value='D'>D등급</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex-1 space-y-4'>
          <div className='relative'>
            <Input
              placeholder='고양이 이름을 입력하세요.'
              value={inputValue}
              onChange={onInputChange}
              className='h-12 border-transparent bg-gray-900 pl-12 text-gray-200'
            />
            <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
          </div>
        </div>

        <Button
          type='submit'
          className='h-12 w-20 bg-gray-900 hover:bg-gray-800'
        >
          검색
        </Button>
      </form>
    </div>
  );
};

export default FilterSidebar;
