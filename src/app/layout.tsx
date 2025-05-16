import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "The Reyes Vault",
  description: "Digital vault for preserving family memories. Forever, searchable, and safe in the cloud.",
  applicationName: 'The Reyes Vault',
  openGraph: {
    title: 'The Reyes Vault',
    description: 'Digital vault for preserving family memories. Forever, searchable, and safe in the cloud.',
    siteName: 'The Reyes Vault',
    url: 'https://thereyesvault.com',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
