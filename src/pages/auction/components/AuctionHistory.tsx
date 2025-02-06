import { useState } from 'react';

import {
  AuctionHistoryItem,
  FilterType,
  useCancelAuctionItem,
  useGetUserAuctionList,
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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
import { cn, formatDate, getCatKorName } from '@/lib/utils';

import { RARITY_CONFIG } from '../../../constant/rarityconfig';
import CustomPagination from './CustomPagination';

const statusConfig = {
  completed: { color: 'text-green-500', text: '거래 완료' },
  inProgress: { color: 'text-blue-500', text: '판매 중' },
  cancelled: { color: 'text-gray-400', text: '취소됨' },
};

const AuctionHistory = () => {
  const [filter, setFilter] = useState<FilterType>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetUserAuctionList({
    filter: filter === 0 ? undefined : filter,
    page: currentPage,
  });

  const cancelAuctionItem = useCancelAuctionItem();

  const getStatus = (item: AuctionHistoryItem) => {
    if (item.sold) return 'completed';
    if (item.cancelled) return 'cancelled';
    return 'inProgress';
  };

  const handleCancel = (id: number) => {
    cancelAuctionItem(id);
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <Select
          value={filter.toString()}
          onValueChange={value => setFilter(Number(value) as FilterType)}
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

      <div className='rounded-lg bg-gray-800'>
        <Table>
          <TableHeader>
            <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
              <TableHead className='text-center text-gray-200'></TableHead>
              <TableHead className='text-center text-gray-200'>등급</TableHead>
              <TableHead className='text-center text-gray-200'>이름</TableHead>
              <TableHead className='text-center text-gray-200'>가격</TableHead>
              <TableHead className='text-center text-gray-200'>
                등록일
              </TableHead>
              <TableHead className='text-center text-gray-200'>상태</TableHead>
              <TableHead className='text-center text-gray-200'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='rounded-lg bg-gray-700'>
            {data?.history.map(item => (
              <TableRow
                key={item.id}
                className='border-gray-600 text-base hover:bg-transparent'
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
                <TableCell className='text-center'>
                  <span
                    className={cn('font-bold', RARITY_CONFIG[item.rarity].text)}
                  >
                    {item.rarity}
                  </span>
                </TableCell>
                <TableCell className='text-center text-gray-200'>
                  {getCatKorName(item.name)}
                </TableCell>
                <TableCell className='text-center font-bold text-blue-400'>
                  {item.price.toLocaleString()}냥
                </TableCell>
                <TableCell className='text-center text-sm text-gray-300'>
                  {formatDate(item.createdAt)}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-center',
                    statusConfig[getStatus(item)].color,
                  )}
                >
                  {statusConfig[getStatus(item)].text}
                </TableCell>
                <TableCell className='w-36'>
                  <div className='flex justify-center'>
                    {getStatus(item) === 'inProgress' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className='bg-blue-500 hover:bg-blue-600'>
                            취소하기
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              <p className='text-center text-2xl'>취소 확인</p>
                            </AlertDialogTitle>
                            <AlertDialogDescription className='text-center text-base text-gray-200'>
                              <span
                                className={cn(
                                  'font-bold',
                                  RARITY_CONFIG[item.rarity].text,
                                )}
                              >
                                {getCatKorName(item.name)}
                              </span>
                              을(를) 다시 데려올까요?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              onClick={() => handleCancel(item.id)}
                              className='bg-blue-500 hover:bg-blue-600'
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomPagination
          currentPage={currentPage}
          totalPage={data?.totalPage || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AuctionHistory;
