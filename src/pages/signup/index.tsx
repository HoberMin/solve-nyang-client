import Layout from '@/components/Layout';

import { SignupForm } from './components/SignupForm';
import { SignupGuide } from './components/SignupGuide';

const Signup = () => {
  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-16 px-4 lg:flex-row lg:px-8'>
        <SignupGuide />
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
