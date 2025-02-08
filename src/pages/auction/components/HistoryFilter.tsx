import { FilterType } from '@/apis/auction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface FilterSelectProps {
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
}

const HistoryFilter = ({ filter, onFilterChange }: FilterSelectProps) => {
  return (
    <div className='ml-2'>
      <Select
        value={filter}
        onValueChange={value => onFilterChange(value as FilterType)}
      >
        <SelectTrigger className='border-none bg-transparent text-gray-200 ring-0 ring-offset-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
          거래 상태
        </SelectTrigger>
        <SelectContent className='border-transparent bg-gray-900 text-gray-200'>
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
