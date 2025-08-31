import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next'
import './globals.css';
import { Toaster } from '@src/components/ui/sonner';
import { DynamicThemeColor } from '@/src/components/dynamic-theme-color';
import { DynamicViewport } from '@/src/components/dynamic-viewport';
export { viewport } from './(seo)/viewport';
export { metadata } from './(seo)/metadata';

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
  preload: true,
  fallback: ['system-ui', 'arial'],
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground antialiased min-h-dvh flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <DynamicThemeColor />
          <DynamicViewport />
          {children}
          <Analytics />
          <Toaster
            position='bottom-right'
            duration={5000}
            visibleToasts={5}
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast: '!rounded-none',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;