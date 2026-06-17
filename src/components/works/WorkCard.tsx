import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/types";
import { assetPath } from "@/lib/asset-path";

export function WorkCard({ work }: { work: Work }) {
  const photoSubtypeLabels: Record<string, string> = {
    portrait: "人像",
    landscape: "风光",
    "architecture-photo": "建筑",
  };

  return (
    <Link
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
            作品
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
        <p className="line-clamp-2 flex-1 text-[0.8125rem] text-muted">{work.summary}</p>
        {work.date && (
          <p className="mt-2 text-[0.6875rem] text-muted/70">{work.date}</p>
        )}
      </div>
    </Link>
  );
}
