import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';

interface TeamMember {
  role: string;
  name: string;
  github: string;
}

interface Designer {
  role: string;
  name: string;
  email: string;
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

  const designer: Designer = {
    role: 'Designer',
    name: '박희진',
    email: '1223phjin@naver.com',
  };

  const TeamSection = ({
    title,
    members,
  }: {
    title: string;
    members: TeamMember[];
  }) => (
    <div>
      <h4 className='mb-4 text-lg font-bold text-white/90'>{title}</h4>
      <div className='grid gap-3'>
        {members.map((member, index) => (
          <motion.a
            key={member.github}
            href={`https://github.com/${member.github}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 rounded-lg p-2 text-gray-300/90 transition-all hover:bg-white/5 hover:text-white'
            initial={{ opacity: 0, x: title.includes('Frontend') ? 5 : -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Github size={16} />
            <div>
              <div className='text-sm font-medium text-gray-400/90'>
                {member.role}
              </div>
              <div className='text-base'>{member.name}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );

  const DesignerSection = () => (
    <div>
      <h4 className='mb-4 text-lg font-bold text-white/90'>Designer</h4>
      <motion.a
        href={`mailto:${designer.email}`}
        className='flex items-center gap-3 rounded-lg p-2 text-gray-300/90 transition-all hover:bg-white/5 hover:text-white'
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Mail size={16} />
        <div>
          <div className='text-sm font-medium text-gray-400/90'>
            {designer.role}
          </div>
          <div className='text-base'>{designer.name}</div>
        </div>
      </motion.a>
    </div>
  );

  return (
    <footer className='w-full border-t border-white/10 bg-black/20 py-8'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <div className='mb-8 grid gap-12 border-b border-white/10 pb-8 md:grid-cols-2'>
          <div className='flex max-w-lg flex-col justify-center'>
            <h3 className='mb-4 text-2xl font-bold text-white/90'>
              About 솔브냥
            </h3>
            <p className='text-lg leading-relaxed text-gray-300/90'>
              솔브냥은 알고리즘 문제 해결을 통해 고양이 캐릭터를 수집하는 특별한
              서비스입니다. 문제를 해결하면 가챠를 통해 다양한 레어리티의 귀여운
              고양이 캐릭터를 얻을 수 있어요.
            </p>
            <div className='mt-4'>
              <p className='text-base text-gray-400/90'>제작: Team 2EIS</p>
            </div>
          </div>

          <div>
            <h3 className='mb-6 text-2xl font-bold text-white/90'>
              개발팀 소개
            </h3>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
              <TeamSection title='Backend Team' members={backendMembers} />
              <TeamSection title='Frontend Team' members={frontendMembers} />
              <DesignerSection />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
          <div className='text-base text-gray-400/80'>
            © 2024 솔브냥. All rights reserved.
          </div>
          <div className='flex gap-6'>
            <a
              href='#'
              className='text-base text-gray-400/80 transition-colors hover:text-white'
            >
              이용약관
            </a>
            <a
              href='#'
              className='text-base text-gray-400/80 transition-colors hover:text-white'
            >
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
