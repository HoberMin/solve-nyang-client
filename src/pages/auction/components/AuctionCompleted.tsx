import { useState } from 'react';

import { Search } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

type Rarity = 'S' | 'A' | 'B' | 'C' | 'D';
type AuctionStatus = '거래 완료' | '진행 중';

interface AuctionHistoryItem {
  id: number;
  name: string;
  rarity: Rarity;
  price: number;
  image: string;
  status: AuctionStatus;
  startDate: string;
  endDate: string;
}

const rarityConfig: Record<
  Rarity,
  { border: string; text: string; bg: string }
> = {
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]', bg: 'bg-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]', bg: 'bg-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]', bg: 'bg-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]', bg: 'bg-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]', bg: 'bg-[#a663ee]' },
};

const statusConfig: Record<AuctionStatus, { color: string }> = {
  '거래 완료': { color: 'text-green-500' },
  '진행 중': { color: 'text-blue-500' },
};

const AuctionCompleted = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // 더미 데이터
  const dummyItems: AuctionHistoryItem[] = [
    {
      id: 1,
      name: '실타래냥',
      rarity: 'S',
      price: 5000,
      image: '/cats/YarnBallCat.svg',
      status: '거래 완료',
      startDate: '2024.01.20',
      endDate: '2024.01.25',
    },
    {
      id: 2,
      name: '어항냥',
      rarity: 'A',
      price: 3000,
      image: '/cats/FishbowlCat.svg',
      status: '진행 중',
      startDate: '2024.01.25',
      endDate: '2024.01.30',
    },
    {
      id: 3,
      name: 'JS냥',
      rarity: 'B',
      price: 2000,
      image: '/cats/JSCat.svg',
      status: '거래 완료',
      startDate: '2024.01.15',
      endDate: '2024.01.20',
    },
  ];

  const handleCancel = (id: number) => {
    console.log(`Auction ${id} cancelled`);
    // 여기에 취소 로직 추가
  };

  const filteredItems = dummyItems
    .filter(item => selectedStatus === 'ALL' || item.status === selectedStatus)
    .filter(
      item =>
        searchTerm === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className='space-y-6'>
      {/* 검색 및 필터 영역 */}
      <div className='flex gap-4'>
        {/* 검색 */}
        <div className='flex-1'>
          <div className='relative'>
            <Input
              placeholder='고양이 이름을 입력하세요.'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='h-12 border-transparent bg-gray-800 pl-12 text-gray-200'
            />
            <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
          </div>
        </div>

        {/* 상태 필터 */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className='h-12 w-[150px] border-transparent bg-gray-800 text-gray-200'>
            <SelectValue placeholder='상태' />
          </SelectTrigger>
          <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
            <SelectItem value='ALL'>전체</SelectItem>
            <SelectItem value='거래 완료'>거래 완료</SelectItem>
            <SelectItem value='진행 중'>진행 중</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 테이블 */}
      <div className='rounded-lg bg-gray-800'>
        <Table>
          <TableHeader>
            <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
              <TableHead className='text-center text-gray-200'></TableHead>
              <TableHead className='text-center text-gray-200'>이름</TableHead>
              <TableHead className='text-center text-gray-200'>등급</TableHead>
              <TableHead className='text-center text-gray-200'>가격</TableHead>
              <TableHead className='w-[150px] text-center text-gray-200'>
                시작일
              </TableHead>
              <TableHead className='w-[150px] text-center text-gray-200'>
                종료일
              </TableHead>
              <TableHead className='text-center text-gray-200'>상태</TableHead>
              <TableHead className='text-center text-gray-200'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='rounded-lg bg-gray-700'>
            {filteredItems.map(item => (
              <TableRow
                key={item.id}
                className='border-gray-600 text-base hover:bg-gray-600'
              >
                <TableCell className='w-24'>
                  <div className='flex justify-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='h-16 w-16 object-cover'
                    />
                  </div>
                </TableCell>
                <TableCell className='text-center font-medium text-gray-200'>
                  {item.name}
                </TableCell>
                <TableCell className='text-center'>
                  <span
                    className={cn('font-bold', rarityConfig[item.rarity]?.text)}
                  >
                    {item.rarity}등급
                  </span>
                </TableCell>
                <TableCell className='text-center font-bold text-blue-400'>
                  {item.price.toLocaleString()}냥
                </TableCell>
                <TableCell className='text-center text-sm text-gray-400'>
                  {item.startDate}
                </TableCell>
                <TableCell className='text-center text-sm text-gray-400'>
                  {item.endDate}
                </TableCell>
                <TableCell
                  className={cn('text-center', statusConfig[item.status].color)}
                >
                  {item.status}
                </TableCell>
                <TableCell className='w-[120px]'>
                  {item.status === '진행 중' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className='h-8 bg-gray-600 px-4 text-sm text-gray-200 hover:bg-gray-500'>
                          취소하기
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='border-transparent bg-gray-800 text-gray-200'>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <p className='text-center text-2xl'>취소 확인</p>
                          </AlertDialogTitle>
                          <AlertDialogDescription className='text-center text-base text-gray-200'>
                            <span className='font-bold text-yellow-500'>
                              {item.name}
                            </span>
                            을(를) 다시 데려올까요?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            className='bg-gray-600 text-gray-200 hover:bg-gray-500'
                            onClick={() => handleCancel(item.id)}
                          >
                            확인
                          </AlertDialogAction>
                          <AlertDialogCancel className='bg-gray-700 text-gray-200 hover:bg-gray-600'>
                            취소
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuctionCompleted;
