import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageHeader, Section, Tag } from "@/components/ui/primitives";
import {
  getProjectBySlug,
  getProjectCategories,
  getProjects,
} from "@/lib/data";
import { formatDateRange } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const categoryLabel =
    getProjectCategories().find((c) => c.id === project.category)?.label ??
    project.category;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-foreground"
      >
        ← 返回项目列表
      </Link>

      <PageHeader title={project.title} description={project.summary} />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Tag>{categoryLabel}</Tag>
        <span className="text-sm text-muted">{formatDateRange(project)}</span>
        <span className="text-sm text-muted">{project.role}</span>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="space-y-12">
        <Section title="背景与问题">
          <p className="text-sm text-muted">{project.problem}</p>
        </Section>

        <Section title="我的贡献">
          <p className="text-sm text-muted">{project.myContribution}</p>
        </Section>

        {project.users && (
          <Section title="目标用户">
            <p className="text-sm text-muted">{project.users}</p>
          </Section>
        )}

        {project.aiAspect && (
          <Section title="AI 相关">
            <p className="text-sm text-muted">{project.aiAspect}</p>
          </Section>
        )}

        {project.vibecodingNote && (
          <Section title="Vibecoding 实践">
            <p className="text-sm text-muted">{project.vibecodingNote}</p>
            {project.buildTime && (
              <p className="mt-2 text-sm text-muted">开发周期：{project.buildTime}</p>
            )}
          </Section>
        )}

        {project.stack && project.stack.length > 0 && (
          <Section title="技术栈">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </Section>
        )}

        {project.decisions && project.decisions.length > 0 && (
          <Section title="关键决策">
            <div className="space-y-2">
              {project.decisions.map((item) => (
                <p key={item} className="text-sm text-muted">
                  · {item}
                </p>
              ))}
            </div>
          </Section>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <Section title="关键指标">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.metrics.map((item) => (
                <Card key={item}>
                  <p className="text-sm text-muted">{item}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        <Section title="结果与收获">
          <p className="text-sm text-muted">{project.outcome}</p>
        </Section>

        <Section title="与 AI PM 的关联">
          <Card>
            <p className="text-sm text-muted">{project.pmTakeaway}</p>
          </Card>
        </Section>

        {(project.siteUrl || project.links?.length) && (
          <Section title="相关链接">
            <div className="flex flex-wrap gap-4">
              {project.siteUrl && project.siteUrl !== "#" && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4"
                >
                  访问网站
                </a>
              )}
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
