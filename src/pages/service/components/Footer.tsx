import { Github, Mail, Phone } from 'lucide-react';

interface ContactInfo {
  type: 'github' | 'email' | 'phone';
  value: string;
  icon: typeof Github | typeof Mail | typeof Phone;
  label: string;
  href?: string;
}

export const Footer = () => {
  const contactDetails: ContactInfo[] = [
    {
      type: 'github',
      value: 'HoberMin',
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/HoberMin',
    },
    {
      type: 'email',
      value: 'sonhomin98@naver.com',
      icon: Mail,
      label: 'Email',
    },
    {
      type: 'phone',
      value: '010-3420-1317',
      icon: Phone,
      label: 'Phone',
    },
  ];

  const ContactSection = ({ items }: { items: ContactInfo[] }) => (
    <div className='space-y-3'>
      {items.map(item => {
        const Icon = item.icon;
        const content = (
          <div className='flex items-center space-x-3 rounded-lg p-2 text-gray-300/90'>
            <Icon size={16} className='text-gray-400' />
            <div>
              <div className='text-xs text-gray-400'>{item.label}</div>
              <div className='text-sm'>{item.value}</div>
            </div>
          </div>
        );

        return item.href ? (
          <a
            key={item.type}
            href={item.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {content}
          </a>
        ) : (
          <div key={item.type}>{content}</div>
        );
      })}
    </div>
  );

  return (
    <footer className='mx-auto w-[80%] border-t border-white/10 bg-black/20 py-4'>
      <div className='mx-auto w-full max-w-3xl px-4'>
        <div className='mb-4 grid gap-[150px] border-b border-white/10 pb-4 md:grid-cols-2'>
          <div className='flex max-w-sm flex-col justify-center'>
            <h3 className='mb-2 text-xl font-bold text-white/90'>
              고양이 수집형 알고리즘 서비스
            </h3>
            <p className='text-xs leading-relaxed text-gray-300/90'>
              알고리즘 문제를 해결하고 귀여운 고양이 캐릭터를 수집하세요. 각
              문제를 풀면 가챠를 통해 다양한 등급의 캐릭터를 획득할 수 있는
              특별한 서비스입니다.
            </p>
          </div>

          <div>
            <h3 className='mb-4 text-xl font-bold text-white/90'>
              Contact Information
            </h3>
            <ContactSection items={contactDetails} />
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='text-xs text-gray-400/80'>
            © 2025 HoberMin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
