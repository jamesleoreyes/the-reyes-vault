import { Geist } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next"
import NavBar from "@/components/navbar";
import "./globals.css";

const defaultUrl = process.env["VERCEL_URL"]
  ? `https://${process.env["VERCEL_URL"]}`
  : "http://localhost:3000";

interface Meta {
  title: string;
  description: string;
  siteName: string;
}

const meta: Meta = {
  title: 'The Reyes Vault',
  description: "Digital vault for preserving family memories. Forever, searchable, and safe in the cloud.",
  siteName: 'The Reyes Vault'
}

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: meta.title,
  description: meta.description,
  applicationName: meta.siteName,
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
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <NavBar />
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
                <Analytics />
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
