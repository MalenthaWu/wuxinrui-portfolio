import type { PhotographySubtype, Work, WorkType } from "@/lib/types";

export function getWorkImages(work: Work): string[] {
  if (work.images && work.images.length > 0) return work.images;
  if (work.cover) return [work.cover];
  return [];
}

export type WorkTabId = "all" | WorkType;

export function filterWorks(
  works: Work[],
  type: WorkTabId,
  photoSubtype?: PhotographySubtype | "all",
): Work[] {
  let filtered = works;

  if (type !== "all") {
    filtered = filtered.filter((work) => work.type === type);
  }

  if (type === "photography" && photoSubtype && photoSubtype !== "all") {
    filtered = filtered.filter((work) => work.subtype === photoSubtype);
  }

  return filtered;
}

export function getAdjacentWorks(works: Work[], currentSlug: string) {
  const index = works.findIndex((work) => work.slug === currentSlug);
  if (index === -1) {
    return { prev: undefined, next: undefined, index: -1 };
  }

  return {
    prev: index > 0 ? works[index - 1] : undefined,
    next: index < works.length - 1 ? works[index + 1] : undefined,
    index,
  };
}

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  photography: "摄影",
  architecture: "建筑",
  design: "设计",
};

export const PHOTO_SUBTYPE_LABELS: Record<PhotographySubtype, string> = {
  landscape: "风光",
  portrait: "人像",
  "architecture-photo": "建筑",
};
