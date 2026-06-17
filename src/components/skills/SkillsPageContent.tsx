import type { SkillsContent } from "@/lib/types";
import { Card, Section, Tag } from "@/components/ui/primitives";

export function SkillsPageContent({ content }: { content: SkillsContent }) {
  const platformMap = Object.fromEntries(
    content.mediaPlatforms.map((p) => [p.id, p.name]),
  );

  return (
    <div className="space-y-16">
      <Section title="技能地图">
        <div className="grid gap-4 md:grid-cols-2">
          {content.skillGroups.map((group) => (
            <Card key={group.category}>
              <h3 className="mb-4 text-sm font-medium text-foreground">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-foreground">{item.name}</span>
                    <div className="text-right text-muted">
                      {item.level && <span>{item.level}</span>}
                      {item.note && (
                        <p className="mt-1 text-xs">{item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="自媒体实践" id="media">
        <div className="space-y-6">
          <Card>
            <p className="mb-2 text-sm font-medium text-foreground">
              {content.mediaOverview.accountName}
            </p>
            <p className="mb-4 text-sm text-muted">{content.mediaOverview.direction}</p>
            <div className="space-y-2">
              {content.mediaOverview.aiPmConnection.map((line) => (
                <p key={line} className="text-sm text-muted">
                  · {line}
                </p>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {content.mediaPlatforms.map((platform) => (
              <Card key={platform.id}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    {platform.name}
                  </h3>
                  <Tag>{platform.handle}</Tag>
                </div>
                <p className="mb-3 text-sm text-muted">{platform.positioning}</p>
                {platform.stats && (
                  <div className="mb-4 space-y-1 text-xs text-muted">
                    {Object.entries(platform.stats).map(([key, value]) => (
                      <p key={key}>
                        {key}：{value}
                      </p>
                    ))}
                  </div>
                )}
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4"
                >
                  访问主页
                </a>
              </Card>
            ))}
          </div>

          {content.mediaOverview.methodology && (
            <Card>
              <h3 className="mb-3 text-sm font-medium text-foreground">创作方法论</h3>
              <div className="space-y-2">
                {content.mediaOverview.methodology.map((line) => (
                  <p key={line} className="text-sm text-muted">
                    · {line}
                  </p>
                ))}
              </div>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {content.mediaContents.map((item) => (
              <Card key={item.id}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Tag>{platformMap[item.platformId] ?? item.platformId}</Tag>
                  <span className="text-xs text-muted">{item.type}</span>
                </div>
                <h3 className="mb-2 text-sm font-medium text-foreground">{item.title}</h3>
                <p className="mb-3 text-sm text-muted">{item.summary}</p>
                {item.aiPmConnection && (
                  <p className="text-sm text-muted">
                    <span className="text-foreground">与 AI PM：</span>
                    {item.aiPmConnection}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
