import { HelpCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const SignupGuide = () => {
  return (
    <div className='space-y-2 text-white'>
      <div className='flex justify-center gap-3 text-center'>
        <h3 className='mb-1 text-xl font-bold'>회원가입 방법</h3>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <HelpCircle
                    size={24}
                    color='lightgreen'
                    strokeWidth={1.5}
                    className='cursor-pointer'
                  />
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent className='border-zinc-500 bg-white bg-zinc-950/90 sm:max-w-[500px]'>
                <DialogHeader>
                  <DialogTitle className='text-base text-white'>
                    회원가입 상세 설명
                  </DialogTitle>
                </DialogHeader>
                <div className='relative aspect-[3/4] w-full overflow-hidden rounded-lg'>
                  <img
                    className='object-fit h-full w-full'
                    src='/signup_description.jpg'
                    alt='회원가입 설명'
                  />
                </div>
              </DialogContent>
            </Dialog>
            <TooltipContent
              side='top'
              align='center'
              sideOffset={40}
              className='rounded border border-gray-200 bg-white p-2 text-black shadow-md'
            >
              <p>자세한 설명을 원한다면 클릭하세요</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p>① solved.ac 닉네임 입력 후 키 발급 버튼 클릭</p>
      <p>② 암호화키 복사</p>
      <div className='flex gap-4'>
        <p>③ solved.ac 로그인</p>
        <a href='https://solved.ac/' target='_blank'>
          [바로가기]
        </a>
      </div>
      <p>④ 로그인 후 프로필 창 - '설정' 클릭</p>
      <p>⑤ 개인정보 - 이름 항목에 암호화키 입력</p>
      <p className='pl-4'>* 모국어와 영어 모두 작성해주세요 </p>
      <p>⑥ 프로필에 이름 표시 ON</p>
      <p>⑦ 회원가입 페이지로 돌아와 솔브냥 비밀번호 입력</p>
      <p>⑧ 솔브냥 회원가입 버튼 클릭</p>
      <p className='pl-4'>
        * 회원가입 시 작성하는 비밀번호는 솔브냥의 비밀번호 입니다.
      </p>
    </div>
  );
};
