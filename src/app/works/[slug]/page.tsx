import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { assetPath } from "@/lib/asset-path";
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

  const images = work.images ?? (work.cover ? [work.cover] : []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <Link
        href="/works"
        className="mb-8 inline-block text-[0.8125rem] text-muted hover:text-foreground"
      >
        ← 返回作品集
      </Link>

      <header className="mb-10">
        <p className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent">
          {work.type === "photography"
            ? "摄影"
            : work.type === "architecture"
              ? "建筑"
              : "设计"}
        </p>
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-foreground md:text-[2.5rem]">
          {work.title}
        </h1>
        <p className="mt-3 max-w-2xl text-[1rem] text-muted">{work.summary}</p>
        {work.date && <p className="mt-2 text-[0.8125rem] text-muted/70">{work.date}</p>}
      </header>

      {images.length > 0 && (
        <section className="mb-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((img, i) => (
              <div
                key={img}
                className={`relative overflow-hidden rounded-2xl bg-foreground/[0.03] ${
                  i === 0 && images.length > 1 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={assetPath(img)}
                  alt={`${work.title} ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-black/[0.04]">
          <h2 className="mb-3 text-[0.875rem] font-semibold text-foreground">背景</h2>
          <p className="text-[0.875rem] leading-relaxed text-muted">{work.context}</p>
        </div>
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-black/[0.04]">
          <h2 className="mb-3 text-[0.875rem] font-semibold text-foreground">我的角色</h2>
          <p className="text-[0.875rem] text-muted">{work.myRole}</p>
          <ul className="mt-3 space-y-1.5">
            {work.decisions.map((d) => (
              <li key={d} className="text-[0.8125rem] text-muted">
                · {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl bg-accent/5 p-5 ring-1 ring-accent/10">
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          <span className="font-medium text-foreground">与 AI PM 的关联 · </span>
          {work.aiPmConnection}
        </p>
      </section>

      {work.externalUrl && (
        <div className="mt-8">
          <a
            href={assetPath(work.externalUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-accent px-6 py-2.5 text-[0.875rem] font-medium text-white hover:opacity-90"
          >
            查看完整作品集 PDF →
          </a>
        </div>
      )}
    </div>
  );
}
