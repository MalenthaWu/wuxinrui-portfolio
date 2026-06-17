import type { Work } from "@/lib/types";
import { WorkCard } from "./WorkCard";

const PHOTO_GROUPS = [
  { id: "landscape" as const, label: "风光", description: "自然与城市风光摄影" },
  { id: "portrait" as const, label: "人像", description: "人像叙事与情绪表达" },
  {
    id: "architecture-photo" as const,
    label: "建筑",
    description: "建筑空间与地标摄影",
  },
];

export function PhotographyGroups({ works }: { works: Work[] }) {
  const photography = works.filter((w) => w.type === "photography");

  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground">
          摄影作品
        </h2>
        <p className="mt-1 text-[0.875rem] text-muted">按风光、人像、建筑分类浏览</p>
      </div>

      {PHOTO_GROUPS.map((group) => {
        const items = photography.filter((w) => w.subtype === group.id);
        if (items.length === 0) return null;

        return (
          <div key={group.id}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-[1.125rem] font-semibold text-foreground">
                  {group.label}
                </h3>
                <p className="text-[0.8125rem] text-muted">{group.description}</p>
              </div>
              <span className="shrink-0 text-[0.75rem] text-muted">{items.length} 组</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
