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
        description="完整呈现每组作品，支持列表切换、图片浏览与键盘方向键翻页。"
      />
      <WorkList works={works} />
    </div>
  );
}
