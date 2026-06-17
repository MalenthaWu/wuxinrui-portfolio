"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectCategoryConfig } from "@/lib/types";
import { getProductLogic, PRODUCT_STEPS } from "@/lib/project-logic";
import { formatDateRange } from "@/lib/utils";

export function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategoryConfig[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

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
            className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all ${
              activeCategory === tab.id
                ? "bg-foreground text-background"
                : "bg-foreground/[0.04] text-muted hover:bg-foreground/[0.08] hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => {
          const logic = getProductLogic(project);
          const isExpanded = expandedSlug === project.slug;

          return (
            <article
              key={project.id}
              className="group flex flex-col rounded-2xl bg-surface p-4 ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.6875rem] font-medium text-accent">
                  {categoryMap[project.category]}
                </span>
                <span className="text-[0.6875rem] text-muted">
                  {formatDateRange(project)}
                </span>
              </div>

              <h3 className="mb-1 text-[0.9375rem] font-semibold leading-snug text-foreground">
                {project.title}
              </h3>
              <p className="mb-3 text-[0.75rem] text-muted">{project.role}</p>
              <p className="mb-4 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted">
                {project.summary}
              </p>

              {/* AI Product Logic mini breakdown */}
              <div className="mb-4 space-y-1.5">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  产品逻辑
                </p>
                <div className="flex flex-wrap gap-1">
                  {PRODUCT_STEPS.map((step) => (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() =>
                        setExpandedSlug(isExpanded ? null : project.slug)
                      }
                      className="rounded-md px-2 py-1 text-[0.625rem] font-medium text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              {isExpanded && (
                <div className="mb-4 animate-[fadeIn_0.3s_ease-out] space-y-2 rounded-xl bg-foreground/[0.03] p-3">
                  {PRODUCT_STEPS.map((step) => (
                    <div key={step.key} className="flex gap-2 text-[0.75rem]">
                      <span
                        className="shrink-0 font-semibold"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </span>
                      <span className="text-muted">{logic[step.key]}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[0.625rem] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[0.75rem] font-medium text-accent hover:opacity-80"
                >
                  详情 →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
