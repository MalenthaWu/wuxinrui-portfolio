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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="项目经历"
        description="AI 产品、Vibecoding 工具、网站搭建与研究实践，按类型分类，可持续更新。"
      />
      <ProjectList projects={projects} categories={categories} />
    </div>
  );
}
