import Link from 'next/link';
import { Vault } from 'lucide-react';
import { PlaceholderImage } from '@src/components';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link href='/' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 mr-1 items-center justify-center'>
              <Vault className='size-4' />
            </div>
            <h1 className='text-2xl font-light'>The Reyes Vault</h1>
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          {children}
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <PlaceholderImage className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale' />
      </div>
    </div>
  );
};

export default AuthLayout;