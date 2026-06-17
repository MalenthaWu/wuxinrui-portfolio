import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { Card, Tag } from "@/components/ui/primitives";

export function ProjectCard({
  project,
  categoryLabel,
}: {
  project: Project;
  categoryLabel: string;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Card className="h-full transition-colors group-hover:border-foreground/20">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Tag>{categoryLabel}</Tag>
          <span className="text-xs text-muted">{formatDateRange(project)}</span>
        </div>
        <h3 className="mb-2 text-base font-medium text-foreground group-hover:opacity-80">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </Card>
    </Link>
  );
}
