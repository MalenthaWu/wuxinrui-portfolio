import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/lib/types";

export function HomeHero({ home }: { home: HomeContent }) {
  return (
    <section className="relative flex min-h-[calc(100vh-2.75rem)] flex-col items-center justify-center px-6 pb-20 pt-12 text-center md:min-h-[calc(100vh-3rem)] md:pb-28 md:pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--hero-glow),_transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {home.portrait && (
          <div className="mb-8 md:mb-10">
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]">
              <Image
                src={home.portrait}
                alt={home.name}
                width={280}
                height={280}
                priority
                className="h-[200px] w-[200px] object-cover object-top md:h-[240px] md:w-[240px]"
              />
            </div>
          </div>
        )}

        <h1 className="text-[3.25rem] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground md:text-[5.5rem]">
          {home.name}
        </h1>

        <p className="mt-5 max-w-2xl text-[1.125rem] font-normal leading-snug tracking-[-0.01em] text-muted md:mt-6 md:text-[1.375rem]">
          {home.tagline}
        </p>

        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted/90 md:text-[1.0625rem]">
          {home.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12">
          <Link
            href="/projects"
            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-[0.9375rem] font-medium text-white transition-opacity hover:opacity-88"
          >
            项目经历
          </Link>
          <Link
            href="/works"
            className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full bg-foreground/[0.06] px-6 py-2.5 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-foreground/[0.09]"
          >
            作品集
          </Link>
          <Link
            href="/skills#media"
            className="inline-flex items-center justify-center px-2 py-2.5 text-[0.9375rem] font-medium text-accent transition-opacity hover:opacity-80"
          >
            技能与自媒体 →
          </Link>
        </div>
      </div>
    </section>
  );
}
