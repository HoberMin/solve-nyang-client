import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import Layout from '@/components/Layout';

import AuctionHistory from './AuctionHistory';
import AuctionMarketPrice from './AuctionMarketPrice';
import AuctionPurchase from './AuctionPurchase';
import AuctionSale from './AuctionSale';
import AuctionHeader from './components/AuctionHeader';

const AuctionPage = () => {
  return (
    <Layout>
      <div className='relative mx-auto mb-8 flex h-full w-full max-w-7xl flex-col'>
        <AuctionHeader />

        <Tabs defaultValue='purchase'>
          <TabsList className='mt-3 grid w-full grid-cols-4 rounded-md bg-gray-900/95 backdrop-blur-sm'>
            <TabsTrigger
              value='purchase'
              className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
            >
              구매
            </TabsTrigger>
            <TabsTrigger
              value='marketprice'
              className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
            >
              시세
            </TabsTrigger>
            <TabsTrigger
              value='sale'
              className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
            >
              판매
            </TabsTrigger>
            <TabsTrigger
              value='history'
              className='bg-transparent font-bold text-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-lg data-[state=active]:text-blue-400'
            >
              판매 내역
            </TabsTrigger>
          </TabsList>
          <div className='mt-3'>
            <TabsContent value='purchase'>
              <AuctionPurchase />
            </TabsContent>
            <TabsContent value='marketprice'>
              <AuctionMarketPrice />
            </TabsContent>
            <TabsContent value='sale'>
              <AuctionSale />
            </TabsContent>
            <TabsContent value='history'>
              <AuctionHistory />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AuctionPage;
