import { Calendar, Construction, Heart, Image, Trophy } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <div
      className='relative min-h-screen w-full overflow-x-hidden bg-black font-neo'
      style={{
        backgroundImage: 'url("/solve-nyang-bg.png")',
        backgroundSize: '1200px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
        <div className='w-full max-w-lg rounded-lg bg-gray-900/70 p-8 text-center backdrop-blur-lg'>
          <div className='relative inline-flex items-center justify-center gap-4'>
            <Construction className='h-16 w-16 text-pink-300' />
          </div>

          <h2 className='mt-6 text-3xl font-bold text-pink-400'>
            서비스 업데이트 준비중
          </h2>

          <p className='mt-4 text-lg text-gray-200'>
            2월 14일 오후 1시에 더욱 특별한 기능으로 찾아뵙겠습니다
          </p>

          <div className='mt-8 space-y-4'>
            <div className='flex items-center gap-3 rounded-lg bg-gray-800/50 p-3 text-left'>
              <Image className='h-5 w-5 flex-shrink-0 text-pink-400' />
              <span className='text-gray-200'>이미지 커스텀 기능</span>
            </div>

            <div className='flex items-center gap-3 rounded-lg bg-gray-800/50 p-3 text-left'>
              <Heart className='h-5 w-5 flex-shrink-0 text-pink-400' />
              <span className='text-gray-200'>발렌타인데이 특별 이벤트</span>
            </div>

            <div className='flex items-center gap-3 rounded-lg bg-gray-800/50 p-3 text-left'>
              <Calendar className='h-5 w-5 flex-shrink-0 text-pink-400' />
              <span className='text-gray-200'>솔브냥 출석체크</span>
            </div>

            <div className='flex items-center gap-3 rounded-lg bg-gray-800/50 p-3 text-left'>
              <Trophy className='h-5 w-5 flex-shrink-0 text-pink-400' />
              <span className='text-gray-200'>솔브냥 공모전</span>
            </div>
          </div>

          <p className='mt-8 text-sm font-medium text-pink-300'>
            💝 발렌타인데이 특별 업데이트를 기다려주세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
