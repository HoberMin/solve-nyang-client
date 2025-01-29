import Layout from '@/components/Layout';

import { AvatarCollection } from './AvatarCollection';
import { MyAvatar } from './MyAvatar';

const FarmCollection = () => {
  return (
    <Layout>
      <div className='h-full overflow-y-auto'>
        <div className='container mx-auto space-y-6 px-[160px] py-8'>
          <div className='grid gap-6 md:grid-cols-[1fr,350px]'>
            <MyAvatar />
            {/* <PlayerInfo /> */}
          </div>
          <AvatarCollection />
        </div>
      </div>
    </Layout>
  );
};

export default FarmCollection;
