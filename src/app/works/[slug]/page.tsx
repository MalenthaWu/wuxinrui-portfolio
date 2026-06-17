import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkDetailViewer } from "@/components/works/WorkDetailViewer";
import { getWorkBySlug, getWorks } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getWorks().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "作品未找到" };
  return { title: work.title, description: work.summary };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const relatedWorks = getWorks().filter((item) => item.type === work.type);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <Link
        href="/works"
        className="mb-8 inline-block text-[0.8125rem] text-muted hover:text-foreground"
      >
        ← 返回作品集
      </Link>

      <WorkDetailViewer work={work} relatedWorks={relatedWorks} />
    </div>
  );
}
