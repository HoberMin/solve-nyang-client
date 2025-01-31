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

type Rarity = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';
type PurchaseStatus = 'success' | 'already-sold' | 'insufficient-funds' | null;

interface AuctionItem {
  id: number;
  name: string;
  rarity: Rarity;
  currentBid: number;
  image: string;
}

const rarityConfig: Record<
  Rarity,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>(null);
  const [isResult, setIsResult] = useState(false);

  const dummyItems: AuctionItem[] = [
    {
      id: 1,
      name: '실타래냥',
      rarity: 'S',
      currentBid: 5000,
      image: '/cats/YarnBallCat.svg',
    },
    {
      id: 2,
      name: '어항냥',
      rarity: 'A',
      currentBid: 3000,
      image: '/cats/FishbowlCat.svg',
    },
  ];

  const filteredItems =
    selectedRarity === 'ALL'
      ? dummyItems
      : dummyItems.filter(item => item.rarity === selectedRarity);

  const handleSearch = () => {
    // 검색 로직 구현
    console.log('Searching for:', searchTerm);
  };

  const handlePurchase = () => {
    const random = Math.random();
    if (random < 0.33) {
      setPurchaseStatus('success');
    } else if (random < 0.66) {
      setPurchaseStatus('already-sold');
    } else {
      setPurchaseStatus('insufficient-funds');
    }
    setSelectedItem(null);
    setIsResult(true);
  };

  const getPurchaseResultContent = () => {
    switch (purchaseStatus) {
      case 'success':
        return {
          title: '구매 성공',
          description: '성공적으로 구매하였습니다.',
          buttonText: '확인',
          variant: 'default',
        };
      case 'already-sold':
        return {
          title: '구매 실패',
          description: '이미 거래된 아바타입니다.',
          buttonText: '확인',
          variant: 'destructive',
        };
      case 'insufficient-funds':
        return {
          title: '구매 실패',
          description: '냥코인이 부족합니다.',
          buttonText: '확인',
          variant: 'destructive',
        };
      default:
        return null;
    }
  };

  return (
    <div className='flex gap-6'>
      {/* 왼쪽 사이드바 */}
      <div className='w-72 space-y-6'>
        <div className='space-y-4 rounded-lg bg-gray-800 p-4'>
          <div className='space-y-2'>
            <div className='relative'>
              <Input
                placeholder='고양이 이름을 입력하세요.'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='h-12 border-transparent bg-gray-700 pl-12 text-gray-200'
              />
              <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
            </div>
            <Button
              className='w-full bg-blue-500 hover:bg-blue-600'
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-gray-400'>등급</p>
            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className='h-12 w-full border-transparent bg-gray-700 text-gray-200'>
                <SelectValue placeholder='등급' />
              </SelectTrigger>
              <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
                <SelectItem value='ALL'>전체</SelectItem>
                <SelectItem value='S'>S등급</SelectItem>
                <SelectItem value='A'>A등급</SelectItem>
                <SelectItem value='B'>B등급</SelectItem>
                <SelectItem value='C'>C등급</SelectItem>
                <SelectItem value='D'>D등급</SelectItem>
                <SelectItem value='H'>Hidden</SelectItem>
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
                <SelectItem value='latest'>최신순</SelectItem>
                <SelectItem value='price-high'>가격 높은순</SelectItem>
                <SelectItem value='price-low'>가격 낮은순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {filteredItems.map(item => (
                <TableRow
                  key={item.id}
                  className='cursor-pointer border-gray-600 text-base hover:bg-gray-600'
                  onClick={() => setSelectedItem(item)}
                >
                  <TableCell className='w-32'>
                    <div className='flex justify-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='h-16 w-16 object-cover'
                      />
                    </div>
                  </TableCell>
                  <TableCell className='font-medium text-gray-200'>
                    {item.name}
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
                    {item.currentBid.toLocaleString()}냥
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Purchase Confirmation Dialog */}
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
              <span className='font-bold text-blue-500'>
                {selectedItem?.currentBid.toLocaleString()}냥
              </span>
              에 정말로 구매하시겠습니까?
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

      {/* Result Dialog */}
      <AlertDialog open={isResult} onOpenChange={setIsResult}>
        <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-base text-gray-400'>
              <p className='text-center text-2xl'>
                {getPurchaseResultContent()?.title}
              </p>
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center text-base text-gray-200'>
              {getPurchaseResultContent()?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setIsResult(false)}
              className='bg-blue-500 hover:bg-blue-600'
            >
              {getPurchaseResultContent()?.buttonText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AuctionBrowse;
