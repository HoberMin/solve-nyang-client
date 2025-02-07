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
    <div className='w-72 space-y-6'>
      <form
        onSubmit={onSearch}
        className='space-y-4 rounded-lg bg-gray-800 p-4'
      >
        <div className='space-y-2'>
          <div className='relative'>
            <Input
              placeholder='고양이 이름을 입력하세요.'
              value={inputValue}
              onChange={onInputChange}
              className='h-12 border-transparent bg-gray-700 pl-12 text-gray-200'
            />
            <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
          </div>
          <Button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600'
          >
            검색
          </Button>
        </div>

        <div className='space-y-2'>
          <p className='text-sm text-gray-400'>등급</p>
          <Select value={selectedRarity} onValueChange={onRarityChange}>
            <SelectTrigger className='h-12 w-full border-transparent bg-gray-700 text-gray-200'>
              <SelectValue placeholder='등급' />
            </SelectTrigger>
            <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
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
      </form>
    </div>
  );
};

export default FilterSidebar;
