import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/lib/types";

export function HomeHero({ home }: { home: HomeContent }) {
  return (
    <section className="relative min-h-[calc(100vh-2.75rem)] px-6 pb-16 pt-10 md:min-h-[calc(100vh-3rem)] md:pb-20 md:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top_left,_var(--hero-glow),_transparent_65%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {/* Left: English headline + details */}
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-[0.8125rem] font-medium uppercase tracking-[0.2em] text-muted">
            {home.heroGreeting}
          </p>

          <h1 className="text-[clamp(3rem,10vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground">
            {home.englishName}
          </h1>

          <div className="mt-6 space-y-2">
            <p className="text-[1.375rem] font-medium tracking-[-0.02em] text-foreground md:text-[1.75rem]">
              {home.name}
            </p>
            <p className="text-[1rem] leading-relaxed text-muted md:text-[1.125rem]">
              {home.tagline}
            </p>
            <p className="text-[0.9375rem] text-muted/80">{home.subtitle}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {home.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-foreground/[0.05] px-3.5 py-1.5 text-[0.8125rem] font-medium text-foreground/80 ring-1 ring-black/[0.04]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={home.resumeUrl}
              className="inline-flex min-w-[9rem] items-center justify-center rounded-full bg-accent px-7 py-3 text-[0.9375rem] font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              个人简历
            </a>
            <a
              href={`mailto:${home.contactEmail}`}
              className="inline-flex min-w-[9rem] items-center justify-center rounded-full bg-foreground px-7 py-3 text-[0.9375rem] font-medium text-background transition-all hover:opacity-90"
            >
              联系方式
            </a>
          </div>
        </div>

        {/* Right: portrait + about */}
        <div className="order-1 flex flex-col items-center lg:order-2 lg:items-end">
          {home.portrait && (
            <div className="mb-8 lg:mb-10">
              <div className="relative overflow-hidden rounded-[32px] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.05]">
                <Image
                  src={home.portrait}
                  alt={home.name}
                  width={320}
                  height={320}
                  priority
                  className="h-[220px] w-[220px] object-cover object-top md:h-[280px] md:w-[280px]"
                />
              </div>
            </div>
          )}

          <div className="w-full max-w-md rounded-3xl bg-surface/80 p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05] backdrop-blur-sm lg:max-w-none">
            <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-accent">
              About Me
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-muted md:text-[1rem]">
              {home.aboutBrief}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-[0.8125rem]">
              <Link href="/projects" className="font-medium text-accent hover:opacity-80">
                查看项目 →
              </Link>
              <Link href="/works" className="font-medium text-muted hover:text-foreground">
                作品集 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
