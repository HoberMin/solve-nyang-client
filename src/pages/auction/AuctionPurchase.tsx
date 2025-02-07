import { useState } from 'react';

import { SortType, useBuyAuctionItem, useGetAuctionList } from '@/apis/auction';
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

const AuctionBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');
  const [inputValue, setInputValue] = useState('');

  const queryParams = {
    keyword: searchTerm || undefined,
    rarity: selectedRarity === 'ALL' ? undefined : selectedRarity,
    sort: Number(sortBy) as SortType,
    page: currentPage,
  };

  const { data } = useGetAuctionList(queryParams);
  const { totalPage, merchandises } = data || {};
  const buyAuctionItem = useBuyAuctionItem();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    setCurrentPage(1);
  };

  const handleRarity = (value: RarityFilterType) => {
    setSelectedRarity(value);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className='flex gap-6'>
      <FilterSidebar
        inputValue={inputValue}
        selectedRarity={selectedRarity}
        sortBy={sortBy}
        onInputChange={handleChange}
        onSearch={handleSearch}
        onRarityChange={handleRarity}
        onSortChange={handleSort}
      />

      <div className='flex-1'>
        <div className='rounded-lg bg-gray-800'>
          <Table>
            <TableHeader>
              <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
                <TableHead className='text-center text-gray-200'></TableHead>
                <TableHead className='text-center text-gray-200'>
                  등급
                </TableHead>
                <TableHead className='text-center text-gray-200'>
                  이름
                </TableHead>
                <TableHead className='text-center text-gray-200'>
                  가격
                </TableHead>
                <TableHead className='text-center text-gray-200'>
                  등록일
                </TableHead>
                <TableHead className='text-center text-gray-200'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='rounded-lg bg-gray-700'>
              {merchandises?.map(item => (
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
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AuctionBrowse;
