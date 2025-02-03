import { useState } from 'react';

import { Search } from 'lucide-react';

import {
  RarityType,
  SortType,
  useBuyAuctionItem,
  useGetAuctionList,
} from '@/apis/auction';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

import CustomPagination from './CustomPagination';

type RarityFilter = 'ALL' | RarityType;

interface SelectedItem {
  id: number;
  name: string;
  price: number;
}

const rarityConfig: Record<
  RarityType,
  { border: string; text: string; bg: string }
> = {
  H: { border: 'border-[#26ffc9]', text: 'text-[#26ffc9]', bg: 'bg-[#26ffc9]' },
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]', bg: 'bg-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]', bg: 'bg-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]', bg: 'bg-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]', bg: 'bg-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]', bg: 'bg-[#a663ee]' },
};

const AuctionBrowse = () => {
  // 필터링 State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRarity, setSelectedRarity] = useState<RarityFilter>('ALL');

  const [inputValue, setInputValue] = useState(''); // 입력값 저장

  const queryParams = {
    keyword: searchTerm || undefined,
    rarity: selectedRarity === 'ALL' ? undefined : selectedRarity,
    sort: Number(sortBy) as SortType,
    page: currentPage,
  };

  const { data } = useGetAuctionList(queryParams);
  const { totalPage, merchandises } = data || {};

  // 구매 State
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [result, setResult] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const { mutateAsync: buyAuctionItem } = useBuyAuctionItem();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue); // 입력값으로 검색
    setCurrentPage(1); // 맨 처음으로 이동
  };

  const handleRarity = (value: string) => {
    setSelectedRarity(value as RarityFilter);
  };
  const handlePurchase = () => {
    if (!selectedItem) return;

    buyAuctionItem(selectedItem.id);
  };

  return (
    <div className='flex gap-6'>
      {/* 왼쪽 사이드바 */}
      <div className='w-72 space-y-6'>
        <form
          onSubmit={handleSearch}
          className='space-y-4 rounded-lg bg-gray-800 p-4'
        >
          <div className='space-y-2'>
            <div className='relative'>
              <Input
                placeholder='고양이 이름을 입력하세요.'
                value={inputValue}
                onChange={handleChange}
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
            <Select value={selectedRarity} onValueChange={handleRarity}>
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

          <div className='space-y-2'>
            <p className='text-sm text-gray-400'>정렬</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='h-12 w-full border-transparent bg-gray-700 text-gray-200'>
                <SelectValue placeholder='정렬 기준' />
              </SelectTrigger>
              <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
                <SelectItem value='0'>최신순</SelectItem>
                <SelectItem value='1'>가격 높은순</SelectItem>
                <SelectItem value='2'>가격 낮은순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>

      {/* 오른쪽 테이블 영역 */}
      <div className='flex-1'>
        <div className='rounded-lg bg-gray-800'>
          <Table>
            <TableHeader>
              <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
                <TableHead className='text-gray-200'></TableHead>
                <TableHead className='text-gray-200'>이름</TableHead>
                <TableHead className='text-gray-200'>등급</TableHead>
                <TableHead className='text-gray-200'>가격</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='rounded-lg bg-gray-700'>
              {merchandises.map(item => (
                <TableRow
                  key={item.id}
                  className='cursor-pointer border-gray-600 text-base hover:bg-gray-600'
                  onClick={() =>
                    setSelectedItem({
                      id: item.id,
                      name: getCatKorName(item.name),
                      price: item.price,
                    })
                  }
                >
                  <TableCell className='w-32'>
                    <div className='flex justify-center'>
                      <img
                        src={`/cats/${item.name}.svg`}
                        alt={item.name}
                        className='h-16 w-16 object-cover'
                      />
                    </div>
                  </TableCell>
                  <TableCell className='font-medium text-gray-200'>
                    {getCatKorName(item.name)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'font-bold',
                        rarityConfig[item.rarity]?.text,
                      )}
                    >
                      {item.rarity}등급
                    </span>
                  </TableCell>
                  <TableCell className='font-bold text-blue-400'>
                    {item.price.toLocaleString()}냥
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 페이지네이션 */}
          <CustomPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <AlertDialog
        open={!!selectedItem}
        onOpenChange={() => setSelectedItem(null)}
      >
        <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className='text-center text-2xl'>구매 확인</p>
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base text-gray-200'>
              <span className='font-bold text-yellow-500'>
                {selectedItem?.name}
              </span>
              을(를){' '}
              <span className='font-bold text-blue-400'>
                {selectedItem?.price.toLocaleString()}냥
              </span>
              에 구매하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-gray-700 text-gray-200 hover:bg-gray-600'>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePurchase}
              className='bg-blue-500 hover:bg-blue-600'
            >
              구매
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!result} onOpenChange={() => setResult(null)}>
        <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-base text-gray-400'>
              <p className='text-center text-2xl'>{result?.title}</p>
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base text-gray-200'>
              {result?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setResult(null)}
              className='bg-blue-500 hover:bg-blue-600'
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AuctionBrowse;
