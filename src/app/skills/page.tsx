import type { Metadata } from "next";
import { SkillsPageContent } from "@/components/skills/SkillsPageContent";
import { PageHeader } from "@/components/ui/primitives";
import { getSkillsContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "技能",
};

export default function SkillsPage() {
  const skills = getSkillsContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="技能"
        description="产品、AI、设计与内容传播能力，以及自媒体实践。"
      />
      <SkillsPageContent content={skills} />
    </div>
  );
}
