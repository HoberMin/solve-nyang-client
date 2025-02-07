// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
// } from '@/components/ui/pagination';

// const CustomPagination = ({
//   currentPage,
//   totalPage,
//   onPageChange,
// }: {
//   currentPage: number;
//   totalPage: number;
//   onPageChange: (page: number) => void;
// }) => {
//   const getPageGroup = () => {
//     const groupIndex = Math.floor((currentPage - 1) / 10);
//     const startPage = groupIndex * 10 + 1;
//     const endPage = Math.min(startPage + 9, totalPage);

//     return Array.from(
//       { length: endPage - startPage + 1 },
//       (_, i) => startPage + i,
//     );
//   };

//   const isPrevGroup = currentPage > 10;
//   const isNextGroup = totalPage > Math.floor((currentPage - 1) / 10) * 10 + 10;

//   return (
//     <Pagination className='p-2'>
//       <PaginationContent className='gap-1'>
//         {isPrevGroup && (
//           <PaginationItem>
//             <PaginationLink
//               onClick={() =>
//                 onPageChange(Math.floor((currentPage - 1) / 10) * 10)
//               }
//               className='mx-3 cursor-pointer text-gray-400 hover:bg-transparent hover:text-gray-200'
//             >
//               {'< 이전'}
//             </PaginationLink>
//           </PaginationItem>
//         )}

//         {getPageGroup().map(pageNum => (
//           <PaginationItem key={pageNum}>
//             <PaginationLink
//               onClick={() => onPageChange(pageNum)}
//               className={`cursor-pointer ${
//                 currentPage === pageNum
//                   ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white'
//                   : 'text-gray-400 hover:bg-transparent hover:text-gray-200'
//               }`}
//             >
//               {pageNum}
//             </PaginationLink>
//           </PaginationItem>
//         ))}

//         {isNextGroup && (
//           <PaginationItem>
//             <PaginationLink
//               onClick={() =>
//                 onPageChange(Math.floor((currentPage - 1) / 10) * 10 + 11)
//               }
//               className='mx-3 cursor-pointer text-gray-400 hover:bg-transparent hover:text-gray-200'
//             >
//               {'다음 >'}
//             </PaginationLink>
//           </PaginationItem>
//         )}
//       </PaginationContent>
//     </Pagination>
//   );
// };

// export default CustomPagination;
