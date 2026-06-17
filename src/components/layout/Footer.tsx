import Link from "next/link";
import { getFooterContent } from "@/lib/data";
import { navItems } from "@/lib/utils";

export function Footer() {
  const footer = getFooterContent();

  return (
    <footer className="mt-auto px-4 pb-6 pt-10 md:px-6">
      <div className="liquid-glass mx-auto max-w-5xl rounded-[1.75rem] p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted">
              联系
            </p>
            <div className="space-y-1.5 text-[0.8125rem] text-muted">
              <p>
                <a
                  href={`mailto:${footer.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {footer.email}
                </a>
              </p>
              <p>{footer.location}</p>
              <p>{footer.status}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted">
              求职意向
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-muted">{footer.jobIntent}</p>
            {footer.resumePdfUrl && (
              <a
                href={footer.resumePdfUrl}
                className="liquid-glass-strong inline-flex rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-opacity hover:opacity-90"
              >
                下载 PDF 简历
              </a>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted">
              导航与自媒体
            </p>
            <div className="flex flex-wrap gap-2">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass rounded-full px-3 py-1 text-[0.75rem] text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="liquid-glass rounded-full px-3 py-1 text-[0.75rem] text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-black/[0.06] pt-4 text-center text-[0.75rem] text-muted">
          © {new Date().getFullYear()} 吴欣睿
        </div>
      </div>
    </footer>
  );
}
