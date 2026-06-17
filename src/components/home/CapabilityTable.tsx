import type { CapabilityMapping } from "@/lib/types";

export function CapabilityTable({
  items,
  closingLine,
}: {
  items: CapabilityMapping[];
  closingLine: string;
}) {
  return (
    <div className="space-y-8">
      <div className="liquid-glass hidden overflow-hidden rounded-2xl md:block">
        <table className="w-full text-left text-[0.9375rem]">
          <thead>
            <tr className="border-b border-black/[0.06]">
              <th className="px-6 py-4 text-[0.8125rem] font-medium uppercase tracking-wide text-muted">
                关键词
              </th>
              <th className="px-6 py-4 text-[0.8125rem] font-medium uppercase tracking-wide text-muted">
                建筑侧能力
              </th>
              <th className="px-6 py-4 text-[0.8125rem] font-medium uppercase tracking-wide text-muted">
                AI PM 侧对应
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.keyword}
                className="border-b border-black/[0.04] last:border-0"
              >
                <td className="px-6 py-5 font-medium text-foreground">
                  {item.keyword}
                </td>
                <td className="px-6 py-5 text-muted">{item.architectureSide}</td>
                <td className="px-6 py-5 text-muted">{item.aiPmSide}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {items.map((item) => (
          <div
            key={item.keyword}
            className="liquid-glass rounded-2xl p-5"
          >
            <p className="mb-3 text-[1rem] font-medium text-foreground">
              {item.keyword}
            </p>
            <div className="space-y-2 text-[0.9375rem] text-muted">
              <p>
                <span className="text-foreground/80">建筑 · </span>
                {item.architectureSide}
              </p>
              <p>
                <span className="text-foreground/80">AI PM · </span>
                {item.aiPmSide}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="liquid-glass mx-auto max-w-3xl rounded-2xl px-5 py-4 text-center text-[0.9375rem] leading-relaxed text-muted">
        {closingLine}
      </p>
    </div>
  );
}
