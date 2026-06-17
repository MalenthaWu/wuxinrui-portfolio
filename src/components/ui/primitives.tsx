import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 space-y-3">
      <h1 className="text-[2rem] font-semibold italic tracking-[-0.03em] text-foreground md:text-[2.5rem]">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

export function Section({
  title,
  children,
  id,
}: {
  title?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="space-y-6">
      {title && (
        <h2 className="text-lg font-semibold italic tracking-tight text-foreground">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`liquid-glass rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="liquid-glass inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm transition-all";
  const styles =
    variant === "primary"
      ? "liquid-glass-strong font-medium text-foreground hover:opacity-90"
      : "liquid-glass text-foreground hover:bg-white/50";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
