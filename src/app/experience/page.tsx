import type { Metadata } from "next";
import { ExperienceSections } from "@/components/experience/ExperienceSections";
import { PageHeader } from "@/components/ui/primitives";
import { getExperienceContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "工作经历",
};

export default function ExperiencePage() {
  const experience = getExperienceContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <PageHeader
        title="工作经历"
        description="实习经历与学生工作分开呈现，展示我在真实场景中的协作、运营与执行能力。"
      />
      <ExperienceSections data={experience} />
    </div>
  );
}
