"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Work } from "@/lib/types";
import { assetPath } from "@/lib/asset-path";

const typeLabels: Record<Work["type"], string> = {
  photography: "摄影",
  architecture: "建筑",
  design: "设计",
};

const photoSubtypeLabels: Record<string, string> = {
  portrait: "人像",
  landscape: "风光",
  "architecture-photo": "建筑摄影",
};

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

  const tabs: { id: "all" | Work["type"]; label: string }[] = [
    { id: "all", label: "全部" },
    { id: "photography", label: "摄影" },
    { id: "architecture", label: "建筑" },
    { id: "design", label: "设计" },
  ];

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
              <h2 className="mb-6 text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
                {typeLabels[type]}
                <span className="ml-2 text-[0.875rem] font-normal text-muted">
                  {items.length} 组
                </span>
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((work) => (
                  <Link
                    key={work.id}
                    href={`/works/${work.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-foreground/[0.04]">
                      {work.cover ? (
                        <Image
                          src={assetPath(work.cover)}
                          alt={work.title}
                          fill
                          sizes="(max-width:768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[0.75rem] text-muted">
                          {typeLabels[work.type]}
                        </div>
                      )}
                      {work.images && work.images.length > 1 && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 text-[0.6875rem] text-white backdrop-blur-sm">
                          {work.images.length} 张
                        </span>
                      )}
                      {work.subtype && (
                        <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2 py-0.5 text-[0.6875rem] font-medium text-foreground backdrop-blur-sm">
                          {photoSubtypeLabels[work.subtype] ?? work.subtype}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 text-[0.9375rem] font-semibold text-foreground group-hover:text-accent">
                        {work.title}
                      </h3>
                      <p className="line-clamp-2 flex-1 text-[0.8125rem] text-muted">
                        {work.summary}
                      </p>
                      {work.date && (
                        <p className="mt-2 text-[0.6875rem] text-muted/70">{work.date}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ),
      )}
    </div>
  );
}
