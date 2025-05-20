import NavBar from "@/components/navbar";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col items center">
          <NavBar />
          <div className="flex flex-col gap-20 p-5">
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </div>
      </main>
    </>
  );
}