import type { Project, ProductLogic } from "./types";

export function getProductLogic(project: Project): ProductLogic {
  if (project.productLogic) return project.productLogic;

  return {
    problem: truncate(project.problem, 48),
    users: truncate(project.users ?? "—", 32),
    solution: truncate(project.myContribution, 48),
    ai: truncate(project.aiAspect ?? project.vibecodingNote ?? "—", 40),
    outcome: truncate(project.outcome, 40),
  };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

export const PRODUCT_STEPS = [
  { key: "problem" as const, label: "痛点", color: "#FF3B30" },
  { key: "users" as const, label: "用户", color: "#FF9500" },
  { key: "solution" as const, label: "方案", color: "#007AFF" },
  { key: "ai" as const, label: "AI", color: "#5856D6" },
  { key: "outcome" as const, label: "结果", color: "#34C759" },
];
