import { useState } from 'react';

import { ArrowUpDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { useBuyAuctionItem, useGetAuctionList } from '@/apis/auction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RARITY_CONFIG } from '@/constant/rarityconfig';
import { RarityFilterType } from '@/lib/type';
import { cn, formatDate, getCatKorName } from '@/lib/utils';

import CustomPagination from './components/CustomPagination';
import FilterSidebar from './components/FilterSidebar';
import PurchaseButton from './components/PurchaseButton';

const AuctionPurchase = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(''); // 검색어 입력

  const { data } = useGetAuctionList(searchParams);
  const { currentPageNumber, totalPage, merchandises } = data || {};
  const buyAuctionItem = useBuyAuctionItem();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (inputValue) {
        prev.set('keyword', inputValue);
      } else {
        prev.delete('keyword');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleRarity = (value: RarityFilterType) => {
    setSearchParams(prev => {
      if (value === 'ALL') {
        prev.delete('rarity');
      } else {
        prev.set('rarity', value);
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSortPrice = () => {
    setSearchParams(prev => {
      const currentSort = prev.get('sort') || '0';
      if (currentSort === '2') {
        prev.set('sort', '3'); // 낮은 가격 순
      } else {
        prev.set('sort', '2'); // 높은 가격 순
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSortDate = () => {
    setSearchParams(prev => {
      const currentSort = prev.get('sort') || '0';
      if (currentSort === '0') {
        prev.set('sort', '1'); // 오래된 순
      } else {
        prev.set('sort', '0'); // 최신 순
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

  return (
    <div className='flex gap-6'>
      <FilterSidebar
        inputValue={inputValue}
        selectedRarity={
          (searchParams.get('rarity') as RarityFilterType) || 'ALL'
        }
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onRarityChange={handleRarity}
      />

      <div className='flex-1'>
        <div className='rounded-lg bg-gray-800'>
          <Table>
            <TableHeader>
              <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
                <TableHead className='w-32 text-center text-gray-200'></TableHead>
                <TableHead className='w-12 text-center text-gray-200'>
                  등급
                </TableHead>
                <TableHead className='w-40 text-center text-gray-200'>
                  이름
                </TableHead>
                <TableHead
                  className='w-44 cursor-pointer text-center text-gray-200'
                  onClick={handleSortPrice}
                >
                  <div className='flex items-center justify-center gap-2'>
                    가격
                    <ArrowUpDown className='h-4 w-4' />
                  </div>
                </TableHead>
                <TableHead
                  className='w-40 cursor-pointer text-center text-gray-200'
                  onClick={handleSortDate}
                >
                  <div className='flex items-center justify-center gap-2'>
                    등록일
                    <ArrowUpDown className='h-4 w-4' />
                  </div>
                </TableHead>
                <TableHead className='w-36 text-center text-gray-200'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='rounded-lg bg-gray-700'>
              {merchandises.map(item => (
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
                      className={cn(
                        'font-bold',
                        RARITY_CONFIG[item.rarity]?.text,
                      )}
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
                  <TableCell className='w-36'>
                    <div className='flex justify-center'>
                      <PurchaseButton item={item} onPurchase={buyAuctionItem} />
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
    </div>
  );
};

export default AuctionPurchase;
