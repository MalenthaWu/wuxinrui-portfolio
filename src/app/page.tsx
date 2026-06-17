import { CapabilityTable } from "@/components/home/CapabilityTable";
import { HomeHero } from "@/components/home/HomeHero";
import { getHomeContent } from "@/lib/data";

export default function HomePage() {
  const home = getHomeContent();

  return (
    <>
      <HomeHero home={home} />

      <div className="mx-auto max-w-4xl px-6 pb-24 md:pb-32">
        <section className="mb-24 md:mb-32">
          <h2 className="mb-8 text-center text-[2rem] font-semibold tracking-[-0.03em] text-foreground md:text-[2.5rem]">
            关于我
          </h2>
          <div className="mx-auto max-w-2xl space-y-5 text-center text-[1.0625rem] leading-relaxed text-muted">
            {home.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-[2rem] font-semibold tracking-[-0.03em] text-foreground md:text-[2.5rem]">
            能力映射
          </h2>
          <CapabilityTable
            items={home.capabilityMapping}
            closingLine={home.closingLine}
          />
        </section>
      </div>
    </>
  );
}
