import { ForgotPasswordForm } from '@/app/(auth-pages)/forgot-password/components/forgot-password-form';
export { default as metadata } from './metadata';

async function ForgotPasswordPage() {
  return (
    <div className='w-full max-w-md'>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;