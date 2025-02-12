import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { ServiceIntro } from './ServiceIntro';

export const Introduce = () => {
  return (
    <div className='mt-10 flex justify-center'>
      <Carousel className='w-full max-w-3xl'>
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card className='bg-gray-50/20'>
                  <CardContent className='flex aspect-[16/9] items-center justify-center p-6'>
                    {/* 여기 들어갈 내용 : 서비스 소개, 신상 캐릭터? */}
                    <ServiceIntro />
                    {/* <span className='text-4xl font-semibold'>{index + 1}</span> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Introduce;
