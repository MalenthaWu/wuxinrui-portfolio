import type { Metadata } from "next";
import { Card, PageHeader, Section, Tag } from "@/components/ui/primitives";
import { getEducationContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "教育经历",
};

export default function EducationPage() {
  const education = getEducationContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="教育经历"
        description="学历背景、荣誉竞赛与科研实践。"
      />

      <div className="space-y-16">
        <Section title="学历">
          <div className="space-y-4">
            {education.degrees.map((degree) => (
              <Card key={`${degree.school}-${degree.end}`}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-medium text-foreground">
                      {degree.school}
                    </h3>
                    <p className="text-sm text-muted">
                      {degree.major} · {degree.degree}
                    </p>
                  </div>
                  <span className="text-sm text-muted">
                    {degree.start} – {degree.end}
                  </span>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {degree.badges?.map((badge) => <Tag key={badge}>{badge}</Tag>)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {degree.highlights.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="荣誉">
          {education.honors.map((group) => (
            <Card key={group.title}>
              <h3 className="mb-4 text-sm font-medium text-foreground">
                {group.title}
              </h3>
              <div className="grid gap-2 md:grid-cols-2">
                {group.items.map((item) => (
                  <p key={item} className="text-sm text-muted">
                    · {item}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </Section>

        <Section title="竞赛经历">
          <div className="grid gap-3 md:grid-cols-2">
            {education.competitions.map((item) => (
              <Card key={`${item.name}-${item.award}`}>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{item.award}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="科研实践">
          <div className="space-y-4">
            {education.research.map((item) => (
              <Card key={item.title}>
                <h3 className="mb-1 text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mb-3 text-xs text-muted">{item.role}</p>
                <p className="mb-3 text-sm text-muted">{item.description}</p>
                {item.publication && (
                  <p className="text-sm text-muted">{item.publication}</p>
                )}
              </Card>
            ))}
          </div>
        </Section>

        <Section title="语言与证书">
          <div className="flex flex-wrap gap-2">
            {education.certificates.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
