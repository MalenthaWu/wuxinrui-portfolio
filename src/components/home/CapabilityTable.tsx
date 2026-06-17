import type { CapabilityMapping } from "@/lib/types";
import { Card } from "@/components/ui/primitives";

export function CapabilityTable({
  items,
  closingLine,
}: {
  items: CapabilityMapping[];
  closingLine: string;
}) {
  return (
    <div className="space-y-6">
      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-5 py-3 font-medium text-foreground">关键词</th>
              <th className="px-5 py-3 font-medium text-foreground">建筑侧能力</th>
              <th className="px-5 py-3 font-medium text-foreground">AI PM 侧对应</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.keyword} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium text-foreground">{item.keyword}</td>
                <td className="px-5 py-4 text-muted">{item.architectureSide}</td>
                <td className="px-5 py-4 text-muted">{item.aiPmSide}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {items.map((item) => (
          <Card key={item.keyword}>
            <p className="mb-3 text-sm font-medium text-foreground">{item.keyword}</p>
            <div className="space-y-2 text-sm text-muted">
              <p>
                <span className="text-foreground">建筑：</span>
                {item.architectureSide}
              </p>
              <p>
                <span className="text-foreground">AI PM：</span>
                {item.aiPmSide}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted">{closingLine}</p>
    </div>
  );
}
