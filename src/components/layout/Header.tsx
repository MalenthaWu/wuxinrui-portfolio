import Link from "next/link";
import { navItems } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-3 md:px-6 md:pt-4">
      <div className="liquid-glass mx-auto flex h-11 max-w-5xl items-center justify-between rounded-full px-4 md:h-12 md:px-5">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[0.9375rem] font-semibold italic tracking-tight text-foreground transition-opacity hover:opacity-70 md:h-9 md:w-9"
          aria-label="首页"
        >
          W
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[0.8125rem] text-muted transition-colors hover:bg-white/40 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full px-3 py-1.5 text-[0.8125rem] font-medium text-foreground">
            菜单
          </summary>
          <div className="liquid-glass-strong absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl p-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-[0.875rem] text-foreground/80 transition-colors hover:bg-white/40"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>

        <div className="hidden w-9 md:block" aria-hidden />
      </div>
    </header>
  );
}
