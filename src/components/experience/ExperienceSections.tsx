"use client";

import { useState } from "react";
import type { ExperienceContent } from "@/lib/types";

function ExperienceCard({
  item,
  index,
}: {
  item: ExperienceContent["internships"][0];
  index: number;
}) {
  return (
    <article
      className="group relative rounded-2xl bg-surface p-5 ring-1 ring-black/[0.04] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] md:p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[1rem] font-semibold text-foreground">{item.title}</h3>
          <p className="mt-0.5 text-[0.875rem] text-muted">
            {item.organization}
            {item.location ? ` · ${item.location}` : ""}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-foreground/[0.05] px-3 py-1 text-[0.75rem] text-muted">
          {item.startDate} – {item.endDate}
        </span>
      </div>
      <p className="mb-3 text-[0.8125rem] font-medium text-accent">{item.role}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.6875rem] font-medium text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
      <ul className="mb-4 space-y-2">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-[0.8125rem] leading-relaxed text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
            {h}
          </li>
        ))}
      </ul>
      {item.pmConnection && (
        <p className="border-t border-black/[0.05] pt-3 text-[0.75rem] leading-relaxed text-muted">
          <span className="font-medium text-foreground/70">AI PM · </span>
          {item.pmConnection}
        </p>
      )}
    </article>
  );
}

export function ExperienceSections({ data }: { data: ExperienceContent }) {
  const [tab, setTab] = useState<"internships" | "studentWork">("internships");
  const items = tab === "internships" ? data.internships : data.studentWork;

  return (
    <div className="space-y-8">
      <div className="flex gap-2 rounded-2xl bg-foreground/[0.04] p-1.5">
        <button
          type="button"
          onClick={() => setTab("internships")}
          className={`flex-1 rounded-xl px-4 py-3 text-[0.875rem] font-medium transition-all ${
            tab === "internships"
              ? "bg-surface text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          实习经历
          <span className="ml-2 text-[0.75rem] text-muted">({data.internships.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("studentWork")}
          className={`flex-1 rounded-xl px-4 py-3 text-[0.875rem] font-medium transition-all ${
            tab === "studentWork"
              ? "bg-surface text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          学生工作经历
          <span className="ml-2 text-[0.75rem] text-muted">({data.studentWork.length})</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
