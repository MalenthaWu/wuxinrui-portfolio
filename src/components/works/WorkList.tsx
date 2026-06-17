"use client";

import { useState } from "react";
import type { Work } from "@/lib/types";
import { Card, Tag } from "@/components/ui/primitives";

const typeLabels: Record<Work["type"], string> = {
  photography: "摄影",
  architecture: "建筑",
  design: "设计",
};

const tabs: { id: "all" | Work["type"]; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "photography", label: "摄影" },
  { id: "architecture", label: "建筑" },
  { id: "design", label: "设计" },
];

export function WorkList({ works }: { works: Work[] }) {
  const [activeType, setActiveType] = useState<"all" | Work["type"]>("all");

  const filtered =
    activeType === "all"
      ? works
      : works.filter((work) => work.type === activeType);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveType(tab.id)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              activeType === tab.id
                ? "bg-foreground text-background"
                : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((work) => (
          <Card key={work.id}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <Tag>{typeLabels[work.type]}</Tag>
              {work.date && <span className="text-xs text-muted">{work.date}</span>}
            </div>
            <div className="mb-4 aspect-[4/3] rounded-lg bg-background" />
            <h3 className="mb-2 text-base font-medium text-foreground">{work.title}</h3>
            <p className="mb-3 text-sm text-muted">{work.summary}</p>
            <p className="text-sm text-muted">
              <span className="text-foreground">与 AI PM：</span>
              {work.aiPmConnection}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
