import Link from "next/link";
import { navItems } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-surface/72 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-11 max-w-5xl items-center justify-between px-6 md:h-12">
        <Link
          href="/"
          className="text-[0.8125rem] font-medium tracking-[-0.01em] text-foreground/90 transition-opacity hover:opacity-70"
        >
          吴欣睿
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none text-[0.8125rem] text-accent">
            菜单
          </summary>
          <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-black/[0.06] bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-[0.875rem] text-foreground/80 hover:bg-foreground/[0.04]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
