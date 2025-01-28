import { useState } from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AuctionItem {
  id: number;
  name: string;
  rarity: string;
  currentBid: number;
  image: string;
  endTime: string;
}

const AuctionBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedRarity, setSelectedRarity] = useState('ALL');

  const dummyItems: AuctionItem[] = [
    {
      id: 1,
      name: '실타래냥',
      rarity: 'S',
      currentBid: 5000,
      image: '/cats/YarnBallCat.svg',
      endTime: '2일 남음',
    },
    {
      id: 2,
      name: '어항냥',
      rarity: 'A',
      currentBid: 3000,
      image: '/cats/FishbowlCat.svg',
      endTime: '5시간 남음',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* 필터 영역 */}
      <div className='flex flex-wrap gap-4'>
        {/* 검색 */}
        <div className='flex-1'>
          <div className='relative'>
            <Input
              placeholder='검색어를 입력하세요'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='h-12 border-transparent bg-gray-800 pl-12 text-gray-200'
            />
            <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
          </div>
        </div>

        {/* 정렬 */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className='h-12 w-[180px] border-transparent bg-gray-800 text-gray-200'>
            <SelectValue placeholder='정렬 기준' />
          </SelectTrigger>
          <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
            <SelectItem value='latest'>최신순</SelectItem>
            <SelectItem value='price-high'>가격 높은순</SelectItem>
            <SelectItem value='price-low'>가격 낮은순</SelectItem>
            <SelectItem value='ending-soon'>마감임박순</SelectItem>
          </SelectContent>
        </Select>

        {/* 등급 필터 */}
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className='h-12 w-[150px] border-transparent bg-gray-800 text-gray-200'>
            <SelectValue placeholder='등급' />
          </SelectTrigger>
          <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
            <SelectItem value='ALL'>전체</SelectItem>
            <SelectItem value='S'>S등급</SelectItem>
            <SelectItem value='A'>A등급</SelectItem>
            <SelectItem value='B'>B등급</SelectItem>
            <SelectItem value='C'>C등급</SelectItem>
            <SelectItem value='D'>D등급</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 아이템 목록 */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {dummyItems.map(item => (
          <div
            key={item.id}
            className='rounded-lg border border-transparent bg-gray-800 p-4 transition-colors hover:border-blue-400'
          >
            <img
              src={item.image}
              alt={item.name}
              className='mb-4 h-40 w-full rounded-md object-cover'
            />
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-gray-200'>{item.name}</h3>
                <span
                  className={`text-sm font-bold ${
                    item.rarity === 'S'
                      ? 'text-[#f74600]'
                      : item.rarity === 'A'
                        ? 'text-[#ffc337]'
                        : 'text-blue-400'
                  }`}
                >
                  {item.rarity}등급
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold text-blue-400'>
                  {item.currentBid.toLocaleString()}냥
                </span>
                <span className='text-sm text-gray-400'>{item.endTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionBrowse;
