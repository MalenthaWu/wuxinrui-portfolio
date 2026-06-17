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
      <div className="liquid-glass rounded-2xl p-10 text-center text-muted">
        该分类下暂无作品
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="liquid-glass rounded-2xl p-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
            分类浏览
          </p>
          <span className="liquid-glass rounded-full px-2.5 py-1 text-[0.6875rem] text-muted">
            共 {filteredWorks.length} 组
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => selectType(tab.id)}
            className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all ${
                activeType === tab.id
                  ? "liquid-glass-strong text-foreground"
                  : "text-muted hover:bg-white/40 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
        </div>
      </div>

      {(activeType === "all" || activeType === "photography") && (
        <div className="flex flex-wrap gap-2 px-1">
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
                  className="liquid-glass rounded-full px-3 py-1.5 text-[0.75rem] text-muted transition-colors hover:text-foreground"
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
                    ? "liquid-glass-strong text-accent"
                    : "liquid-glass text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="liquid-glass space-y-2 rounded-[1.5rem] p-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <p className="mb-2 px-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
            作品列表
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
                    ? "liquid-glass-strong text-foreground"
                    : "hover:bg-white/35"
                }`}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-foreground/[0.04] ring-1 ring-black/[0.04]">
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
                      isActive ? "text-muted" : "text-muted"
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
                {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
              </button>
            );
          })}
        </aside>

        <div className="min-w-0 space-y-5">
          {selectedWork && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em] text-foreground">
                    {selectedWork.title}
                  </h3>
                  <p className="mt-0.5 text-[0.8125rem] text-muted">
                    当前查看 {images.length} 张图 · 使用键盘 ← → 快速切换
                  </p>
                </div>
                <span className="liquid-glass rounded-full px-3 py-1 text-[0.75rem] font-medium text-accent">
                  {selectedWork.type === "photography"
                    ? "摄影"
                    : selectedWork.type === "architecture"
                      ? "建筑"
                      : "设计"}
                </span>
              </div>

              <WorkImageGallery
                key={selectedWork.slug}
                images={images}
                title={selectedWork.title}
              />

              <div className="liquid-glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!prev}
                    onClick={() => prev && selectWork(prev.slug)}
                    className="liquid-glass rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-white/40 disabled:opacity-40"
                  >
                    ← 上一组
                  </button>
                  <button
                    type="button"
                    disabled={!next}
                    onClick={() => next && selectWork(next.slug)}
                    className="liquid-glass rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-white/40 disabled:opacity-40"
                  >
                    下一组 →
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMeta((value) => !value)}
                    className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all ${
                      showMeta
                        ? "liquid-glass-strong text-foreground"
                        : "liquid-glass text-foreground hover:bg-white/40"
                    }`}
                  >
                    {showMeta ? "收起介绍" : "作品介绍"}
                  </button>
                  <Link
                    href={`/works/${selectedWork.slug}`}
                    className="liquid-glass-strong rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-opacity hover:opacity-90"
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
