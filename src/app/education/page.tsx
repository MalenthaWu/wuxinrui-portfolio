import type { Metadata } from "next";
import { EducationExperience } from "@/components/education/EducationExperience";
import { PageHeader } from "@/components/ui/primitives";
import { getEducationContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "教育经历",
};

export default function EducationPage() {
  const education = getEducationContent();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <PageHeader
        title="教育经历"
        description="从徐州到杭州的教育轨迹，地图上的每一步都标注着成长与荣誉。"
      />
      <EducationExperience education={education} />
    </div>
  );
}
