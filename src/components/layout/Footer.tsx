import Link from "next/link";
import { getFooterContent } from "@/lib/data";
import { navItems } from "@/lib/utils";

export function Footer() {
  const footer = getFooterContent();

  return (
    <footer className="mt-auto border-t border-black/[0.06] bg-surface">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-[0.8125rem] font-medium text-foreground">联系</p>
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
          <p className="text-sm font-medium text-foreground">求职意向</p>
          <p className="text-sm text-muted">{footer.jobIntent}</p>
          {footer.resumePdfUrl && (
            <a
              href={footer.resumePdfUrl}
              className="inline-block text-sm text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              下载 PDF 简历
            </a>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">自媒体</p>
          <div className="flex flex-wrap gap-3">
            {footer.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} 吴欣睿
      </div>
    </footer>
  );
}
