// import { useState } from 'react';

// import { Search } from 'lucide-react';
// import { toast } from 'sonner';

// import {
//   Merchandise,
//   SortType,
//   useBuyAuctionItem,
//   useGetAuctionList,
// } from '@/apis/auction';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { FullRarity, RarityFilterType } from '@/lib/type';
// import { cn, formatDate, getCatKorName } from '@/lib/utils';

// import { RARITY_CONFIG } from '../../../constant/rarityconfig';
// import CustomPagination from './CustomPagination';

// const AuctionBrowse = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('0');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRarity, setSelectedRarity] = useState<RarityFilterType>('ALL');
//   const [inputValue, setInputValue] = useState('');
//   const [selectedItem, setSelectedItem] = useState<Merchandise | null>(null);
//   const [result, setResult] = useState<{
//     title: string;
//     description: string;
//   } | null>(null);

//   const queryParams = {
//     keyword: searchTerm || undefined,
//     rarity: selectedRarity === 'ALL' ? undefined : selectedRarity,
//     sort: Number(sortBy) as SortType,
//     page: currentPage,
//   };

//   const { data } = useGetAuctionList(queryParams);
//   const { totalPage, merchandises } = data || {};

//   const buyAuctionItem = useBuyAuctionItem();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSearchTerm(inputValue);
//     setCurrentPage(1);
//   };

//   const handleRarity = (value: FullRarity) => {
//     setSelectedRarity(value);
//     setCurrentPage(1);
//   };

//   const handleSort = (value: string) => {
//     setSortBy(value);
//     setCurrentPage(1);
//   };

//   const handlePurchase = async () => {
//     if (!selectedItem) return;
//     buyAuctionItem(selectedItem.id);
//     setSelectedItem(null);
//   };

//   const handleItemSelect = (item: Merchandise) => {
//     if (item.isMine) {
//       toast.error('자신이 올린 상품은 구매할 수 없습니다.');
//       return;
//     }

//     setSelectedItem(item);
//   };

//   return (
//     <div className='flex gap-6'>
//       <div className='w-72 space-y-6'>
//         <form
//           onSubmit={handleSearch}
//           className='space-y-4 rounded-lg bg-gray-800 p-4'
//         >
//           <div className='space-y-2'>
//             <div className='relative'>
//               <Input
//                 placeholder='고양이 이름을 입력하세요.'
//                 value={inputValue}
//                 onChange={handleChange}
//                 className='h-12 border-transparent bg-gray-700 pl-12 text-gray-200'
//               />
//               <Search className='absolute left-3 top-3 h-6 w-6 text-gray-400' />
//             </div>
//             <Button
//               type='submit'
//               className='w-full bg-blue-500 hover:bg-blue-600'
//             >
//               검색
//             </Button>
//           </div>

//           <div className='space-y-2'>
//             <p className='text-sm text-gray-400'>등급</p>
//             <Select value={selectedRarity} onValueChange={handleRarity}>
//               <SelectTrigger className='h-12 w-full border-transparent bg-gray-700 text-gray-200'>
//                 <SelectValue placeholder='등급' />
//               </SelectTrigger>
//               <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
//                 <SelectItem value='ALL'>전체</SelectItem>
//                 <SelectItem value='H'>H등급</SelectItem>
//                 <SelectItem value='S'>S등급</SelectItem>
//                 <SelectItem value='A'>A등급</SelectItem>
//                 <SelectItem value='B'>B등급</SelectItem>
//                 <SelectItem value='C'>C등급</SelectItem>
//                 <SelectItem value='D'>D등급</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className='space-y-2'>
//             <p className='text-sm text-gray-400'>정렬</p>
//             <Select value={sortBy} onValueChange={handleSort}>
//               <SelectTrigger className='h-12 w-full border-transparent bg-gray-700 text-gray-200'>
//                 <SelectValue placeholder='정렬 기준' />
//               </SelectTrigger>
//               <SelectContent className='border-transparent bg-gray-800 text-gray-200'>
//                 <SelectItem value='0'>최신순</SelectItem>
//                 <SelectItem value='1'>가격 높은순</SelectItem>
//                 <SelectItem value='2'>가격 낮은순</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </form>
//       </div>

//       <div className='flex-1'>
//         <div className='rounded-lg bg-gray-800'>
//           <Table>
//             <TableHeader>
//               <TableRow className='rounded-lg border-gray-700 hover:bg-transparent'>
//                 <TableHead className='text-center text-gray-200'></TableHead>
//                 <TableHead className='text-center text-gray-200'>
//                   등급
//                 </TableHead>
//                 <TableHead className='text-center text-gray-200'>
//                   이름
//                 </TableHead>
//                 <TableHead className='text-center text-gray-200'>
//                   가격
//                 </TableHead>
//                 <TableHead className='text-center text-gray-200'>
//                   등록일
//                 </TableHead>
//                 <TableHead className='text-center text-gray-200'></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className='rounded-lg bg-gray-700'>
//               {merchandises.map(item => (
//                 <TableRow
//                   key={item.id}
//                   className='border-gray-600 text-base hover:bg-transparent'
//                 >
//                   <TableCell className='w-32'>
//                     <div className='flex justify-center'>
//                       <img
//                         src={`/cats/${item.name}.svg`}
//                         alt={item.name}
//                         className='h-16 w-16 object-cover'
//                       />
//                     </div>
//                   </TableCell>
//                   <TableCell className='text-center'>
//                     <span
//                       className={cn(
//                         'font-bold',
//                         RARITY_CONFIG[item.rarity]?.text,
//                       )}
//                     >
//                       {item.rarity}
//                     </span>
//                   </TableCell>
//                   <TableCell className='text-center text-gray-200'>
//                     {getCatKorName(item.name)}
//                   </TableCell>
//                   <TableCell className='text-center font-bold text-blue-400'>
//                     {item.price.toLocaleString()}냥
//                   </TableCell>
//                   <TableCell className='text-center text-sm text-gray-300'>
//                     {formatDate(item.createdAt)}
//                   </TableCell>
//                   <TableCell className='w-36'>
//                     <div className='flex justify-center'>
//                       <Button
//                         disabled={item.sold}
//                         onClick={() => handleItemSelect(item)}
//                         className={cn(
//                           'w-22',
//                           item.sold
//                             ? 'bg-gray-500 hover:bg-gray-500'
//                             : 'bg-blue-500 hover:bg-blue-600',
//                         )}
//                       >
//                         {item.sold ? '판매완료' : '구매하기'}
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <CustomPagination
//             currentPage={currentPage}
//             totalPage={totalPage}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       <AlertDialog
//         open={!!selectedItem}
//         onOpenChange={() => setSelectedItem(null)}
//       >
//         <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               <p className='text-center text-2xl'>구매 확인</p>
//             </AlertDialogTitle>
//             <AlertDialogDescription className='text-center text-base text-gray-200'>
//               {selectedItem && (
//                 <>
//                   <span
//                     className={cn(
//                       'font-bold',
//                       RARITY_CONFIG[selectedItem.rarity]?.text,
//                     )}
//                   >
//                     {selectedItem.name}
//                   </span>
//                   을(를)
//                   <span className='font-bold text-blue-400'>
//                     {selectedItem.price.toLocaleString()}냥
//                   </span>
//                   에 구매하시겠습니까?
//                 </>
//               )}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction
//               onClick={handlePurchase}
//               className='bg-blue-500 hover:bg-blue-600'
//             >
//               구매
//             </AlertDialogAction>
//             <AlertDialogCancel className='bg-gray-700 text-gray-200 hover:bg-gray-600'>
//               취소
//             </AlertDialogCancel>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <AlertDialog open={!!result} onOpenChange={() => setResult(null)}>
//         <AlertDialogContent className='border-transparent bg-gray-800 text-gray-400'>
//           <AlertDialogHeader>
//             <AlertDialogTitle className='text-center text-base text-gray-400'>
//               <p className='text-center text-2xl'>{result?.title}</p>
//             </AlertDialogTitle>
//             <AlertDialogDescription className='text-center text-base text-gray-200'>
//               {result?.description}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction
//               onClick={() => setResult(null)}
//               className='bg-blue-500 hover:bg-blue-600'
//             >
//               확인
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default AuctionBrowse;
