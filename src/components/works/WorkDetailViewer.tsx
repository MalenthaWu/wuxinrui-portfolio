"use client";

import Link from "next/link";
import type { Work } from "@/lib/types";
import { getAdjacentWorks, getWorkImages } from "@/lib/work-utils";
import { WorkImageGallery } from "./WorkImageGallery";
import { WorkMetaPanel } from "./WorkMetaPanel";

export function WorkDetailViewer({
  work,
  relatedWorks,
}: {
  work: Work;
  relatedWorks: Work[];
}) {
  const images = getWorkImages(work);
  const { prev, next } = getAdjacentWorks(relatedWorks, work.slug);

  return (
    <>
      <WorkImageGallery images={images} title={work.title} />

      <div className="liquid-glass mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3">
        <div className="flex gap-2">
          {prev ? (
            <Link
              href={`/works/${prev.slug}`}
              className="liquid-glass rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-white/60"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span className="rounded-full bg-foreground/[0.03] px-4 py-2 text-[0.8125rem] text-muted/50">
              已是第一组
            </span>
          )}
          {next ? (
            <Link
              href={`/works/${next.slug}`}
              className="liquid-glass rounded-full px-4 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-white/60"
            >
              {next.title} →
            </Link>
          ) : (
            <span className="rounded-full bg-foreground/[0.03] px-4 py-2 text-[0.8125rem] text-muted/50">
              已是最后一组
            </span>
          )}
        </div>
        <p className="text-[0.75rem] text-muted">使用 ← → 键切换图片</p>
      </div>

      <WorkMetaPanel work={work} />
    </>
  );
}
