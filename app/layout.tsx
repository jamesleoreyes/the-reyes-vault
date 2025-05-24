import { Geist } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const defaultUrl = process.env["VERCEL_URL"]
  ? `https://${process.env["VERCEL_URL"]}`
  : "http://localhost:3000";

interface Meta {
  title: string;
  description: string;
  siteName: string;
  creator: string;
}

const meta: Meta = {
  title: 'The Reyes Vault',
  description: "Digital vault for preserving family memories. Forever, searchable, and safe in the cloud.",
  siteName: 'The Reyes Vault',
  creator: 'James Reyes'
}

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: meta.title,
  description: meta.description,
  applicationName: meta.siteName,
  creator: meta.creator,
  openGraph: {
    type: 'website',
    title: meta.title,
    siteName: meta.siteName,
    description: meta.description,
    url: defaultUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
  appleWebApp: {
    capable: true,
    title: meta.title,
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            duration={4000}
            expand={false}
            visibleToasts={5}
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
