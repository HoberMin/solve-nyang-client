interface TeamMember {
  role: string;
  name: string;
  github: string;
}

export const Footer = () => {
  const backendMembers: TeamMember[] = [
    { role: 'Backend', name: '이동규 팀장', github: 'leedongkyu0407' },
    { role: 'Backend', name: '조성빈', github: 'Foxrain119' },
    { role: 'Backend', name: '박찬영', github: 'cygiraffe' },
  ];

  const frontendMembers: TeamMember[] = [
    { role: 'Frontend', name: '손호민 팀장', github: 'HoberMin' },
    { role: 'Frontend', name: '이다이', github: 'ebeleey' },
    { role: 'Frontend', name: '박희원', github: 'heeeeeeeeeee1' },
  ];

  const TeamSection = ({
    title,
    members,
  }: {
    title: string;
    members: TeamMember[];
  }) => (
    <div className='min-w-[140px]'>
      <h4 className='mb-3 text-sm font-bold text-white/90'>{title}</h4>
      <div className='space-y-2'>
        {members.map(member => (
          <a
            key={member.github}
            href={`https://github.com/${member.github}`}
            target='_blank'
            rel='noopener noreferrer'
            className='block rounded p-2 text-gray-300/90 transition-colors hover:bg-white/5 hover:text-white'
          >
            <div className='space-y-0.5'>
              <div className='text-xs text-gray-400/90'>{member.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <footer className='mx-auto w-[80%] border-t border-white/10 bg-black/20 py-4'>
      <div className='mx-auto w-full max-w-3xl px-4'>
        <div className='mb-4 grid gap-[150px] border-b border-white/10 pb-4 md:grid-cols-2'>
          <div className='flex max-w-sm flex-col justify-center'>
            <h3 className='mb-2 text-base text-xl font-bold text-white/90'>
              About 솔브냥
            </h3>
            <p className='text-xs leading-relaxed text-gray-300/90'>
              솔브냥은 알고리즘 문제 해결을 통해 고양이 캐릭터를 수집하는 특별한
              서비스입니다. 문제를 해결하면 가챠를 통해 다양한 등급의 귀여운
              고양이 캐릭터를 얻을 수 있어요.
            </p>
            <div className='mt-2'>
              <p className='text-xs text-gray-400/90'>제작: Team 2EIS</p>
            </div>
          </div>

          <div>
            <h3 className='mb-6 text-2xl font-bold text-white/90'>
              개발팀 소개
            </h3>
            <div className='flex justify-between'>
              <TeamSection title='Backend Team' members={backendMembers} />
              <TeamSection title='Frontend Team' members={frontendMembers} />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='text-xs text-gray-400/80'>
            © 2025 솔브냥. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
