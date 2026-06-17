import { CapabilityTable } from "@/components/home/CapabilityTable";
import { ButtonLink } from "@/components/ui/primitives";
import { getHomeContent } from "@/lib/data";

export default function HomePage() {
  const home = getHomeContent();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <section className="mb-20 space-y-6">
        <p className="text-sm text-muted">{home.name}</p>
        <h1 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
          {home.tagline}
        </h1>
        <p className="max-w-2xl text-base text-muted md:text-lg">{home.subtitle}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href="/projects">查看项目经历</ButtonLink>
          <ButtonLink href="/works" variant="secondary">
            作品集
          </ButtonLink>
          <ButtonLink href="/skills#media" variant="secondary">
            技能与自媒体
          </ButtonLink>
        </div>
      </section>

      <section className="mb-20 space-y-6">
        <h2 className="text-lg font-medium text-foreground">关于我</h2>
        <div className="max-w-3xl space-y-4 text-base text-muted">
          {home.introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-medium text-foreground">能力映射</h2>
        <CapabilityTable
          items={home.capabilityMapping}
          closingLine={home.closingLine}
        />
      </section>
    </div>
  );
}
