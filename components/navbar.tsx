import Link from "next/link";
import HeaderAuth from "./header-auth";
import { ThemeSwitcher } from "./theme-switcher";

export default async function NavBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="text-xl">The Reyes Vault</Link>
        </div>
        <div className="flex flex-row space-x-2">
          <HeaderAuth />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}