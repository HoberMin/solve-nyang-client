import { FilterType } from '@/apis/auction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterSelectProps {
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
}

const HistoryFilter = ({ filter, onFilterChange }: FilterSelectProps) => {
  return (
    <div className='flex justify-end'>
      <Select
        value={filter}
        onValueChange={value => onFilterChange(value as FilterType)}
      >
        <SelectTrigger className='h-12 w-56 border-transparent bg-gray-700 text-gray-200'>
          <SelectValue placeholder='상태 필터' />
        </SelectTrigger>
        <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
          <SelectItem value='0'>전체</SelectItem>
          <SelectItem value='1'>거래 완료</SelectItem>
          <SelectItem value='2'>판매 중</SelectItem>
          <SelectItem value='3'>취소됨</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HistoryFilter;
