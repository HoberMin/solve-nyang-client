import { useSearchParams } from 'react-router-dom';

import {
  AuctionHistoryItem,
  FilterType,
  useCancelAuctionItem,
  useGetUserAuctionList,
} from '@/apis/auction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { cn, formatDate, getCatKorName } from '@/lib/utils';

import CancelDialog from './components/CancelDialog';
import CustomPagination from './components/CustomPagination';
import HistorySidebar from './components/HistoryFilter';

const statusConfig = {
  completed: { color: 'text-green-500', text: '거래 완료' },
  inProgress: { color: 'text-blue-500', text: '판매 중' },
  cancelled: { color: 'text-gray-400', text: '취소됨' },
};

const AuctionHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useGetUserAuctionList(searchParams);

  const { currentPageNumber, totalPage, history } = data || {};

  const cancelAuctionItem = useCancelAuctionItem();

  const getStatus = (item: AuctionHistoryItem) => {
    if (item.sold) return 'completed';
    if (item.cancelled) return 'cancelled';
    return 'inProgress';
  };

  const handleFilter = (value: FilterType) => {
    setSearchParams(prev => {
      if (value === '0') {
        prev.delete('filter');
      } else {
        prev.set('filter', value);
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const handleCancel = (id: number) => {
    cancelAuctionItem(id);
  };

  return (
    <div className='space-y-6 rounded-lg'>
      <div className='rounded-lg bg-gray-900'>
        <Table>
          <TableHeader>
            <TableRow className='rounded-lg border-gray-800 hover:bg-transparent'>
              <TableHead className='w-32 text-center text-gray-200'></TableHead>
              <TableHead className='w-12 text-center text-gray-200'>
                등급
              </TableHead>
              <TableHead className='w-40 text-center text-gray-200'>
                이름
              </TableHead>
              <TableHead className='w-44 text-center text-gray-200'>
                가격
              </TableHead>
              <TableHead className='w-40 text-center text-gray-200'>
                등록일
              </TableHead>
              <TableHead className='w-36 text-center text-gray-200'>
                <div className='flex items-center justify-center space-x-2'>
                  <HistorySidebar
                    filter={(searchParams.get('filter') as FilterType) || '0'}
                    onFilterChange={handleFilter}
                  />
                </div>
              </TableHead>
              <TableHead className='w-36 text-center text-gray-200'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='rounded-lg bg-gray-800/70'>
            {history?.map(item => (
              <TableRow
                key={item.id}
                className='border-gray-700/70 text-base hover:bg-transparent'
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
                <TableCell className='w-12 text-center'>
                  <span
                    className={cn('font-bold', RARITY_CONFIG[item.rarity].text)}
                  >
                    {item.rarity}
                  </span>
                </TableCell>
                <TableCell className='w-40 text-center text-gray-200'>
                  {getCatKorName(item.name)}
                </TableCell>
                <TableCell className='w-32 text-center font-bold text-blue-400'>
                  {item.price.toLocaleString()}냥
                </TableCell>
                <TableCell className='w-32 text-center text-sm text-gray-300'>
                  {formatDate(item.createdAt)}
                </TableCell>
                <TableCell
                  className={cn(
                    'w-32 text-center',
                    statusConfig[getStatus(item)].color,
                  )}
                >
                  {statusConfig[getStatus(item)].text}
                </TableCell>
                <TableCell className='w-36'>
                  <div className='flex justify-center'>
                    {getStatus(item) === 'inProgress' && (
                      <CancelDialog item={item} onCancel={handleCancel} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomPagination
          currentPage={currentPageNumber}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AuctionHistory;
