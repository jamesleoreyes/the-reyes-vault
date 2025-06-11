import { Geist } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { urlConfig } from "@/lib/config";

const defaultUrl = urlConfig.app
  ? `https://${urlConfig.app}`
  : "http://localhost:3000";

interface Meta {
  title: string;
  description: string;
  siteName: string;
  creator: string;
}

const meta: Meta = {
  title: 'The Reyes Vault',
  description: "A digital vault for preserving family memories. Forever, searchable, and safe in the cloud.",
  siteName: 'The Reyes Vault',
  creator: 'James Reyes'
}

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: `%s | ${meta.title}`,
    default: meta.title
  },
  description: meta.description,
  applicationName: meta.siteName,
  creator: meta.creator,
  openGraph: {
    type: 'website',
    title: {
      template: `%s | ${meta.title}`,
      default: meta.title
    },
    siteName: meta.siteName,
    description: meta.description,
    url: defaultUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: `%s | ${meta.title}`,
      default: meta.title
    },
    description: meta.description,
  },
  appleWebApp: {
    capable: true,
    title: meta.title,
    statusBarStyle: 'default',
    startupImage: '/apple-touch-icon.png'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
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
}
