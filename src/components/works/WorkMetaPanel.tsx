import type { Work } from "@/lib/types";
import { WORK_TYPE_LABELS } from "@/lib/work-utils";
import { assetPath } from "@/lib/asset-path";

export function WorkMetaPanel({ work }: { work: Work }) {
  return (
    <div className="liquid-glass space-y-5 rounded-[1.5rem] p-5 md:p-6">
      <header>
        <p className="mb-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent">
          {WORK_TYPE_LABELS[work.type]}
          {work.date ? ` · ${work.date}` : ""}
        </p>
        <h2 className="text-[1.5rem] font-semibold italic tracking-[-0.02em] text-foreground md:text-[1.75rem]">
          {work.title}
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{work.summary}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="liquid-glass rounded-2xl p-4">
          <h3 className="mb-2 text-[0.8125rem] font-semibold text-foreground">背景</h3>
          <p className="text-[0.8125rem] leading-relaxed text-muted">{work.context}</p>
        </div>
        <div className="liquid-glass rounded-2xl p-4">
          <h3 className="mb-2 text-[0.8125rem] font-semibold text-foreground">我的角色</h3>
          <p className="text-[0.8125rem] text-muted">{work.myRole}</p>
          <ul className="mt-2 space-y-1.5">
            {work.decisions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[0.8125rem] text-muted">
                <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-4">
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          <span className="font-medium text-foreground">与 AI PM 的关联 · </span>
          {work.aiPmConnection}
        </p>
      </div>

      {work.externalUrl && (
        <a
          href={assetPath(work.externalUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass-strong inline-flex rounded-full px-5 py-2.5 text-[0.8125rem] font-medium text-foreground transition-opacity hover:opacity-90"
        >
          查看完整作品集 PDF →
        </a>
      )}
    </div>
  );
}
