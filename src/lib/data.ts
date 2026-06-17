import "server-only";

import fs from "fs";
import path from "path";
import type {
  EducationContent,
  FooterContent,
  HomeContent,
  Project,
  ProjectCategory,
  ProjectCategoryConfig,
  SkillsContent,
  Work,
  ExperienceContent,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getHomeContent(): HomeContent {
  return readJson<HomeContent>(path.join(contentDir, "home.json"));
}

export function getFooterContent(): FooterContent {
  return readJson<FooterContent>(path.join(contentDir, "footer.json"));
}

export function getEducationContent(): EducationContent {
  return readJson<EducationContent>(path.join(contentDir, "education.json"));
}

export function getSkillsContent(): SkillsContent {
  return readJson<SkillsContent>(path.join(contentDir, "skills.json"));
}

export function getExperienceContent(): ExperienceContent {
  return readJson<ExperienceContent>(path.join(contentDir, "experience.json"));
}

export function formatExperienceRange(item: {
  startDate: string;
  endDate: string;
}): string {
  return `${item.startDate} – ${item.endDate}`;
}

export function getProjectCategories(): ProjectCategoryConfig[] {
  return readJson<ProjectCategoryConfig[]>(
    path.join(contentDir, "project-categories.json"),
  ).sort((a, b) => a.order - b.order);
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  const files = fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"));

  const projects = files.map((file) =>
    readJson<Project>(path.join(projectsDir, file)),
  );

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = a.date ?? a.startDate ?? "";
    const dateB = b.date ?? b.startDate ?? "";
    return dateB.localeCompare(dateA);
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getProjects().filter((project) => project.category === category);
}

export function getWorks(): Work[] {
  const worksDir = path.join(contentDir, "works");
  if (!fs.existsSync(worksDir)) return [];

  const files = fs
    .readdirSync(worksDir)
    .filter((file) => file.endsWith(".json"));

  return files
    .map((file) => readJson<Work>(path.join(worksDir, file)))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getWorks().find((work) => work.slug === slug);
}

export function getWorksByType(type: Work["type"]): Work[] {
  return getWorks().filter((work) => work.type === type);
}

