import type { Metadata } from "next";
import { WorkList } from "@/components/works/WorkList";
import { PageHeader } from "@/components/ui/primitives";
import { getWorks } from "@/lib/data";

export const metadata: Metadata = {
  title: "作品集",
};

export default function WorksPage() {
  const works = getWorks();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <PageHeader
        title="作品集"
        description="摄影、建筑与设计作品，共 14 组精选内容，支持图集详情浏览。"
      />
      <WorkList works={works} />
    </div>
  );
}
