import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] justify-center items-center">
        <h1 className="font-bold text-4xl sm:text-8xl">This is the Login page</h1>
        <Link href='/'>Home</Link>
        <Link href='/dashboard'>Dashboard</Link>
      </main>
    </div>
  )
}