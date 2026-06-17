"use client";

import Image from "next/image";
import { useState } from "react";
import type { Work } from "@/lib/types";

const typeLabels: Record<Work["type"], string> = {
  photography: "摄影",
  architecture: "建筑",
  design: "设计",
};

const typeDescriptions: Record<Work["type"], string> = {
  photography: "人像、风光与建筑摄影创作",
  architecture: "建筑方案、竞赛与概念设计",
  design: "平面、文创与视觉设计",
};

const tabs: { id: "all" | Work["type"]; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "photography", label: "摄影" },
  { id: "architecture", label: "建筑" },
  { id: "design", label: "设计" },
];

export function WorkList({ works }: { works: Work[] }) {
  const [activeType, setActiveType] = useState<"all" | Work["type"]>("all");

  const filtered =
    activeType === "all" ? works : works.filter((work) => work.type === activeType);

  const grouped =
    activeType === "all"
      ? (["photography", "architecture", "design"] as const).map((type) => ({
          type,
          items: works.filter((w) => w.type === type),
        }))
      : [{ type: activeType, items: filtered }];

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveType(tab.id)}
            className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all ${
              activeType === tab.id
                ? "bg-foreground text-background"
                : "bg-foreground/[0.04] text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {grouped.map(
        ({ type, items }) =>
          items.length > 0 && (
            <section key={type}>
              <div className="mb-6">
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
                  {typeLabels[type]}
                </h2>
                <p className="mt-1 text-[0.875rem] text-muted">{typeDescriptions[type]}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((work) => (
                  <article
                    key={work.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.08]">
                      {work.cover ? (
                        <Image
                          src={work.cover}
                          alt={work.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-muted/50">
                            {typeLabels[work.type]}
                          </span>
                        </div>
                      )}
                      {work.pending && (
                        <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[0.6875rem] font-medium text-background backdrop-blur-sm">
                          链接待补充
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[0.6875rem] font-medium text-accent">
                          {typeLabels[work.type]}
                        </span>
                        {work.date && (
                          <span className="text-[0.6875rem] text-muted">{work.date}</span>
                        )}
                      </div>
                      <h3 className="mb-2 text-[0.9375rem] font-semibold text-foreground">
                        {work.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                        {work.summary}
                      </p>
                      <p className="mb-4 line-clamp-2 text-[0.75rem] text-muted/80">
                        <span className="text-foreground/60">AI PM · </span>
                        {work.aiPmConnection}
                      </p>

                      {work.externalUrl && work.externalUrl !== "#" ? (
                        <a
                          href={work.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-[0.8125rem] font-medium text-white transition-opacity hover:opacity-90"
                        >
                          查看作品 →
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-foreground/[0.06] px-4 py-2 text-[0.8125rem] text-muted">
                          即将上线
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ),
      )}

      <div className="rounded-2xl border border-dashed border-black/[0.1] bg-foreground/[0.02] p-6 text-center">
        <p className="text-[0.875rem] text-muted">
          更多作品链接正在整理中。发送摄影 / 建筑 / 设计作品集链接后，我会帮你更新到此页面。
        </p>
      </div>
    </div>
  );
}
