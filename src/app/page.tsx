import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] justify-center items-center">
        <h1 className="font-bold text-4xl sm:text-8xl">Welcome!</h1>
        <Button asChild>
          <Link href='/login'>Login</Link>
        </Button>
        <Button asChild>
          <Link href='/dashboard'>Dashboard</Link>
        </Button>
      </main>
    </div>
  );
}
