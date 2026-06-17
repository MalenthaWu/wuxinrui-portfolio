"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { PhotographySubtype, Work } from "@/lib/types";
import { assetPath } from "@/lib/asset-path";
import {
  PHOTO_SUBTYPE_LABELS,
  filterWorks,
  getAdjacentWorks,
  getWorkImages,
  type WorkTabId,
} from "@/lib/work-utils";
import { WorkImageGallery } from "./WorkImageGallery";
import { WorkMetaPanel } from "./WorkMetaPanel";

const TABS: { id: WorkTabId; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "photography", label: "摄影" },
  { id: "architecture", label: "建筑" },
  { id: "design", label: "设计" },
];

const PHOTO_TABS: { id: PhotographySubtype | "all"; label: string }[] = [
  { id: "all", label: "全部摄影" },
  { id: "landscape", label: "风光" },
  { id: "portrait", label: "人像" },
  { id: "architecture-photo", label: "建筑" },
];

export function WorksBrowser({ works }: { works: Work[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeType = (searchParams.get("type") as WorkTabId | null) ?? "all";
  const photoSubtype =
    (searchParams.get("photo") as PhotographySubtype | "all" | null) ?? "all";
  const [showMeta, setShowMeta] = useState(false);

  const filteredWorks = useMemo(
    () => filterWorks(works, activeType, photoSubtype),
    [works, activeType, photoSubtype],
  );

  const selectedSlug = searchParams.get("work");
  const selectedWork =
    filteredWorks.find((work) => work.slug === selectedSlug) ?? filteredWorks[0];

  const { prev, next } = getAdjacentWorks(filteredWorks, selectedWork?.slug ?? "");
  const images = selectedWork ? getWorkImages(selectedWork) : [];

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const selectType = (type: WorkTabId) => {
    const nextWorks = filterWorks(works, type, "all");
    updateParams({
      type: type === "all" ? null : type,
      photo: null,
      work: nextWorks[0]?.slug ?? null,
    });
    setShowMeta(false);
  };

  const selectPhotoSubtype = (subtype: PhotographySubtype | "all") => {
    const nextWorks = filterWorks(works, "photography", subtype);
    updateParams({
      type: "photography",
      photo: subtype === "all" ? null : subtype,
      work: nextWorks[0]?.slug ?? null,
    });
    setShowMeta(false);
  };

  const selectWork = (slug: string) => {
    updateParams({ work: slug });
    setShowMeta(false);
  };

  if (filteredWorks.length === 0) {
    return (
      <div className="rounded-2xl bg-surface p-10 text-center text-muted ring-1 ring-black/[0.04]">
        该分类下暂无作品
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => selectType(tab.id)}
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

      {(activeType === "all" || activeType === "photography") && (
        <div className="flex flex-wrap gap-2">
          {PHOTO_TABS.map((tab) => {
            const isPhotoContext = activeType === "photography";
            const isActive = isPhotoContext
              ? photoSubtype === tab.id
              : tab.id === "all" && activeType === "all";

            if (activeType === "all" && tab.id !== "all") {
              const count = works.filter(
                (work) => work.type === "photography" && work.subtype === tab.id,
              ).length;
              if (count === 0) return null;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectPhotoSubtype(tab.id)}
                  className="rounded-full bg-foreground/[0.04] px-3 py-1.5 text-[0.75rem] text-muted transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
                >
                  {tab.label}
                </button>
              );
            }

            if (!isPhotoContext) return null;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectPhotoSubtype(tab.id)}
                className={`rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "bg-foreground/[0.04] text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-2 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-1">
          <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
            作品列表 · {filteredWorks.length}
          </p>
          {filteredWorks.map((work) => {
            const isActive = work.slug === selectedWork?.slug;
            const thumb = work.cover ?? work.images?.[0];

            return (
              <button
                key={work.id}
                type="button"
                onClick={() => selectWork(work.slug)}
                className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-all ${
                  isActive
                    ? "bg-foreground text-background shadow-md"
                    : "bg-surface ring-1 ring-black/[0.04] hover:ring-black/[0.08]"
                }`}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-foreground/[0.04]">
                  {thumb ? (
                    <Image
                      src={assetPath(thumb)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[0.625rem] text-muted">
                      作品
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.8125rem] font-medium">{work.title}</p>
                  <p
                    className={`mt-0.5 truncate text-[0.6875rem] ${
                      isActive ? "text-background/70" : "text-muted"
                    }`}
                  >
                    {work.subtype
                      ? PHOTO_SUBTYPE_LABELS[work.subtype]
                      : work.type === "architecture"
                        ? "建筑"
                        : "设计"}
                    {work.images?.length ? ` · ${work.images.length} 张` : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        <div className="min-w-0 space-y-5">
          {selectedWork && (
            <>
              <WorkImageGallery
                key={selectedWork.slug}
                images={images}
                title={selectedWork.title}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!prev}
                    onClick={() => prev && selectWork(prev.slug)}
                    className="rounded-full bg-foreground/[0.06] px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-foreground/[0.1] disabled:opacity-40"
                  >
                    ← 上一组
                  </button>
                  <button
                    type="button"
                    disabled={!next}
                    onClick={() => next && selectWork(next.slug)}
                    className="rounded-full bg-foreground/[0.06] px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-foreground/[0.1] disabled:opacity-40"
                  >
                    下一组 →
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMeta((value) => !value)}
                    className="rounded-full bg-surface px-4 py-2 text-[0.8125rem] font-medium text-foreground ring-1 ring-black/[0.06] transition-colors hover:bg-foreground/[0.03]"
                  >
                    {showMeta ? "收起介绍" : "作品介绍"}
                  </button>
                  <Link
                    href={`/works/${selectedWork.slug}`}
                    className="rounded-full bg-accent px-4 py-2 text-[0.8125rem] font-medium text-white transition-opacity hover:opacity-90"
                  >
                    独立页面
                  </Link>
                </div>
              </div>

              {showMeta && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <WorkMetaPanel work={selectedWork} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
