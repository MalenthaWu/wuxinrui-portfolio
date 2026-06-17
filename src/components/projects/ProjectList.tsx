"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategoryConfig } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategoryConfig[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories],
  );

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const tabs = [
    { id: "all", label: "全部" },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
    })),
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              activeCategory === tab.id
                ? "bg-foreground text-background"
                : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">该分类暂无项目，持续更新中。</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              categoryLabel={categoryMap[project.category] ?? project.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
