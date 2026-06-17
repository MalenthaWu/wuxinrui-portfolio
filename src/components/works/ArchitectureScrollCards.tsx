"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Work } from "@/lib/types";
import { assetPath } from "@/lib/asset-path";

export function ArchitectureScrollCards({ works }: { works: Work[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const architecture = works.filter((w) => w.type === "architecture");
  if (architecture.length === 0) return null;

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
            建筑设计作品集
          </h2>
          <p className="mt-1 text-[0.875rem] text-muted">
            左右滑动浏览方案卡片
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-colors hover:bg-foreground/[0.1]"
            aria-label="上一张"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              scrollTo(Math.min(architecture.length - 1, activeIndex + 1))
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-colors hover:bg-foreground/[0.1]"
            aria-label="下一张"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative -mx-6 md:-mx-0">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent md:w-12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent md:w-12"
          aria-hidden
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide md:gap-6 md:px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {architecture.map((work) => (
            <article
              key={work.id}
              className="w-[min(88vw,520px)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.05] md:w-[min(72vw,560px)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/[0.04]">
                {work.cover && (
                  <Image
                    src={assetPath(work.cover)}
                    alt={work.title}
                    fill
                    sizes="560px"
                    className="object-cover"
                    priority={work.slug === "evolo"}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/80">
                    {work.date}
                  </p>
                  <h3 className="mt-1 text-[1.25rem] font-semibold tracking-[-0.02em]">
                    {work.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-[0.875rem] leading-relaxed text-muted">{work.summary}</p>
                <p className="text-[0.8125rem] text-muted">
                  <span className="font-medium text-foreground/80">角色 · </span>
                  {work.myRole}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/works/${work.slug}`}
                    className="rounded-full bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-opacity hover:opacity-90"
                  >
                    查看详情
                  </Link>
                  {work.externalUrl && (
                    <a
                      href={assetPath(work.externalUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-accent/10 px-4 py-2 text-[0.8125rem] font-medium text-accent transition-colors hover:bg-accent/15"
                    >
                      作品集 PDF
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {architecture.map((work, i) => (
          <button
            key={work.id}
            type="button"
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-accent" : "w-2 bg-foreground/20"
            }`}
            aria-label={`跳转到 ${work.title}`}
          />
        ))}
      </div>
    </section>
  );
}
