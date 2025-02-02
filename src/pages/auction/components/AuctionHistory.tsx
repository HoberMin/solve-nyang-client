import { useGetUserAuctionList } from '@/apis/auction';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getCatKorName } from '@/pages/gacha/constants/catMappings';

type RarityType = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

const rarityConfig: Record<
  RarityType,
  { border: string; text: string; bg: string }
> = {
  H: { border: 'border-[#ff0000]', text: 'text-[#ff0000]', bg: 'bg-[#ff0000]' },
  S: { border: 'border-[#f74600]', text: 'text-[#f74600]', bg: 'bg-[#f74600]' },
  A: { border: 'border-[#ffc337]', text: 'text-[#ffc337]', bg: 'bg-[#ffc337]' },
  B: { border: 'border-[#7abf16]', text: 'text-[#7abf16]', bg: 'bg-[#7abf16]' },
  C: { border: 'border-[#108df1]', text: 'text-[#108df1]', bg: 'bg-[#108df1]' },
  D: { border: 'border-[#a663ee]', text: 'text-[#a663ee]', bg: 'bg-[#a663ee]' },
};

const statusConfig = {
  completed: { color: 'text-green-500', text: '거래 완료' },
  inProgress: { color: 'text-blue-500', text: '진행 중' },
  cancelled: { color: 'text-red-500', text: '취소됨' },
};

const AuctionHistory = () => {
  const { data } = useGetUserAuctionList();

  const getStatus = (item: { sold: boolean; cancelled: boolean }) => {
    if (item.sold) return 'completed';
    if (item.cancelled) return 'cancelled';
    return 'inProgress';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
  };

  const handleCancel = (id: number) => {
    console.log(`Auction ${id} cancelled`);
    // 여기에 취소 로직 추가
  };

  return (
    <div className='rounded-lg bg-gray-800'>
      <Table>
        <TableHeader>
          <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
            <TableHead className='text-center text-gray-200'></TableHead>
            <TableHead className='text-center text-gray-200'>이름</TableHead>
            <TableHead className='text-center text-gray-200'>등급</TableHead>
            <TableHead className='text-center text-gray-200'>가격</TableHead>
            <TableHead className='w-[150px] text-center text-gray-200'>
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
              <TableCell className='w-24'>
                <div className='flex justify-center'>
                  <img
                    src={`/cats/${item.name}.svg`}
                    alt={item.name}
                    className='h-16 w-16 object-cover'
                  />
                </div>
              </TableCell>
              <TableCell className='text-center font-medium text-gray-200'>
                {getCatKorName(item.name)}
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
              <TableCell className='w-[120px]'>
                {getStatus(item) === 'inProgress' && (
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
                            {getCatKorName(item.name)}
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
  );
};

export default AuctionHistory;
