import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { PageHeader } from "@/components/ui/primitives";
import { getProjectCategories, getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "项目经历",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const categories = getProjectCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <PageHeader
        title="项目经历"
        description="以 AI 产品逻辑拆解：痛点 → 用户 → 方案 → AI → 结果。"
      />
      <ProjectList projects={projects} categories={categories} />
    </div>
  );
}
