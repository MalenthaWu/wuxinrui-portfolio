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
      <h1 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
        {title}
      </h1>
      {description && <p className="max-w-2xl text-sm text-muted">{description}</p>}
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
        <h2 className="text-lg font-medium tracking-tight text-foreground">
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
    <div
      className={`rounded-xl border border-border bg-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted">
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
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm transition-colors";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-border bg-surface text-foreground hover:bg-background";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
