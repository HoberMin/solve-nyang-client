import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface TeamMember {
  role: string;
  name: string;
  github: string;
}

export const Footer = () => {
  const backendMembers: TeamMember[] = [
    { role: 'Backend 팀장', name: '이동규', github: 'leedongkyu0407' },
    { role: 'Backend 팀원', name: '김지영', github: 'famo1245' },
    { role: 'Backend 팀원', name: '조성빈', github: 'Foxrain119' },
    { role: 'Backend 팀원', name: '박찬영', github: 'cygiraffe' },
  ];

  const frontendMembers: TeamMember[] = [
    { role: 'Frontend 팀장', name: '손호민', github: 'HoberMin' },
    { role: 'Frontend 팀원', name: '이다이', github: 'ebeleey' },
    { role: 'Frontend 팀원', name: '박희원', github: 'heeeeeeeeeee1' },
  ];

  const TeamSection = ({
    title,
    members,
  }: {
    title: string;
    members: TeamMember[];
  }) => (
    <div>
      <h4 className='mb-3 text-sm font-bold text-white/80'>{title}</h4>
      <div className='grid gap-2'>
        {members.map((member, index) => (
          <motion.a
            key={member.github}
            href={`https://github.com/${member.github}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 rounded-lg p-1.5 text-gray-300/90 transition-all hover:text-white'
            initial={{ opacity: 0, x: title.includes('Frontend') ? 5 : -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Github size={14} />
            <div>
              <div className='text-[10px] text-gray-400/90'>{member.role}</div>
              <div className='text-xs'>{member.name}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <footer className='w-full py-4'>
      <div className='mx-auto w-full px-6'>
        <div className='mb-4 grid gap-8 border-b border-white/10 pb-4 md:grid-cols-2'>
          <div className='max-w-md'>
            <h3 className='mb-2 text-lg font-bold text-white/90'>
              About 솔브냥
            </h3>
            <p className='text-xs leading-relaxed text-gray-300/90'>
              솔브냥은 알고리즘 문제 해결을 통해 고양이 캐릭터를 수집하는 특별한
              서비스입니다. 문제를 해결하면 가챠를 통해 다양한 레어리티의 귀여운
              고양이 캐릭터를 얻을 수 있어요.
            </p>
            <div className='mt-2'>
              <p className='text-xs text-gray-400/90'>제작: Team 2EIS</p>
            </div>
          </div>

          <div>
            <h3 className='mb-3 text-lg font-bold text-white/90'>
              개발팀 소개
            </h3>
            <div className='grid grid-cols-2 gap-6'>
              <TeamSection title='Backend Team' members={backendMembers} />
              <TeamSection title='Frontend Team' members={frontendMembers} />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-2 text-center text-xs text-gray-400/80 md:flex-row md:text-left'>
          <div>© 2024 솔브냥. All rights reserved.</div>
          <div className='flex gap-4'>
            <a href='#' className='transition-colors hover:text-white'>
              이용약관
            </a>
            <a href='#' className='transition-colors hover:text-white'>
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
