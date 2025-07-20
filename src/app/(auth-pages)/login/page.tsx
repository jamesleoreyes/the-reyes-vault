import LoginForm from '@/app/(auth-pages)/login/components/Form';
export { default as metadata } from './metadata';

function LoginPage() {
  return (
    <div className='w-full max-w-md'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;