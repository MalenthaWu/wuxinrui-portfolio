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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="作品集"
        description="摄影、建筑与设计作品，附与 AI PM 的能力关联说明。"
      />
      <WorkList works={works} />
    </div>
  );
}
