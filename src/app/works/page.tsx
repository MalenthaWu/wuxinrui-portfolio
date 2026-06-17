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
        description="摄影、建筑与设计作品分类展示。发送链接后可持续更新。"
      />
      <WorkList works={works} />
    </div>
  );
}
