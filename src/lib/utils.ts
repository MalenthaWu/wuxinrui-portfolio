import type { Project } from "./types";

export const navItems = [
  { href: "/", label: "关于我" },
  { href: "/education", label: "教育经历" },
  { href: "/projects", label: "项目经历" },
  { href: "/works", label: "作品集" },
  { href: "/skills", label: "技能" },
] as const;

export function formatDateRange(project: Project): string {
  if (project.startDate && project.endDate) {
    return `${project.startDate} – ${project.endDate}`;
  }
  return project.date ?? "";
}
