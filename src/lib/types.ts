export type ProjectCategory =
  | "ai-product"
  | "vibecoding-tool"
  | "website"
  | "research-workshop"
  | "campus-ops";

export type ProjectLinkType = "demo" | "github" | "figma" | "live" | "doc";

export interface ProjectLink {
  label: string;
  url: string;
  type: ProjectLinkType;
}

export interface ProjectCategoryConfig {
  id: ProjectCategory;
  label: string;
  description?: string;
  order: number;
}

export interface ProductLogic {
  problem: string;
  users: string;
  solution: string;
  ai: string;
  outcome: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  role: string;
  tags: string[];
  featured?: boolean;
  status?: "completed" | "in-progress" | "archived";
  cover?: string;
  images?: string[];
  problem: string;
  myContribution: string;
  outcome: string;
  pmTakeaway: string;
  links?: ProjectLink[];
  stack?: string[];
  vibecodingNote?: string;
  buildTime?: string;
  siteUrl?: string;
  deployTarget?: string;
  users?: string;
  aiAspect?: string;
  decisions?: string[];
  metrics?: string[];
  productLogic?: ProductLogic;
}

export interface CapabilityMapping {
  keyword: string;
  architectureSide: string;
  aiPmSide: string;
}

export interface HomeContent {
  name: string;
  englishName: string;
  heroGreeting: string;
  portrait?: string;
  tagline: string;
  subtitle: string;
  tags: string[];
  aboutBrief: string;
  introParagraphs: string[];
  capabilityMapping: CapabilityMapping[];
  closingLine: string;
  resumeUrl: string;
  contactEmail: string;
}

export interface FooterContent {
  email: string;
  location: string;
  jobIntent: string;
  status: string;
  resumePdfUrl?: string;
  socialLinks: { label: string; url: string }[];
}

export interface EducationItem {
  id: string;
  school: string;
  schoolEn?: string;
  degree: string;
  major: string;
  start: string;
  end: string;
  city: string;
  province: string;
  logo?: string;
  mapPosition: { x: number; y: number };
  highlights: string[];
  badges?: string[];
  honors?: string[];
}

export interface HonorGroup {
  title: string;
  items: string[];
}

export interface CompetitionItem {
  name: string;
  award: string;
  year?: string;
  level?: string;
}

export interface ResearchItem {
  title: string;
  role: string;
  description: string;
  publication?: string;
}

export interface EducationContent {
  degrees: EducationItem[];
  honors: HonorGroup[];
  competitions: CompetitionItem[];
  research: ResearchItem[];
  certificates: string[];
}

export type WorkType = "photography" | "architecture" | "design";

export interface Work {
  id: string;
  slug: string;
  title: string;
  type: WorkType;
  summary: string;
  date?: string;
  cover?: string;
  images?: string[];
  externalUrl?: string;
  pending?: boolean;
  context: string;
  myRole: string;
  decisions: string[];
  outcome: string;
  aiPmConnection: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  note?: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface MediaPlatform {
  id: string;
  name: string;
  handle: string;
  url: string;
  positioning: string;
  stats?: Record<string, string>;
  updateFrequency?: string;
}

export interface MediaContent {
  id: string;
  slug: string;
  platformId: string;
  title: string;
  publishDate?: string;
  type: string;
  cover?: string;
  summary: string;
  url?: string;
  stats?: Record<string, string>;
  tags?: string[];
  aiPmConnection?: string;
}

export interface SkillsContent {
  skillGroups: SkillGroup[];
  mediaOverview: {
    accountName: string;
    direction: string;
    aiPmConnection: string[];
    methodology?: string[];
  };
  mediaPlatforms: MediaPlatform[];
  mediaContents: MediaContent[];
}
