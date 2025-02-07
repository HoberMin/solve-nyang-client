// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

// import Layout from '@/components/Layout';

// import AuctionBrowse from './components/AuctionBrowse';
// import AuctionHeader from './components/AuctionHeader';
// import AuctionHistory from './components/AuctionHistory';
// import AuctionSale from './components/AuctionSale';

// const AuctionPage = () => {
//   return (
//     <Layout>
//       <div className='relative mx-auto mb-8 flex h-full w-full max-w-7xl flex-col'>
//         <AuctionHeader />

//         <Tabs defaultValue='browse'>
//           <TabsList className='mt-3 grid w-full grid-cols-3 rounded-md bg-gray-900/95 backdrop-blur-sm'>
//             <TabsTrigger
//               value='browse'
//               className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
//             >
//               경매 목록
//             </TabsTrigger>
//             <TabsTrigger
//               value='sale'
//               className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
//             >
//               판매
//             </TabsTrigger>
//             <TabsTrigger
//               value='completed'
//               className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
//             >
//               판매 내역
//             </TabsTrigger>
//           </TabsList>
//           <div className='mt-3'>
//             <TabsContent value='browse'>
//               <AuctionBrowse />
//             </TabsContent>
//             <TabsContent value='completed'>
//               <AuctionHistory />
//             </TabsContent>
//             <TabsContent value='sale'>
//               <AuctionSale />
//             </TabsContent>
//           </div>
//         </Tabs>
//       </div>
//     </Layout>
//   );
// };

// export default AuctionPage;
