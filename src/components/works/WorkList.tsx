import { Suspense } from "react";
import type { Work } from "@/lib/types";
import { WorksBrowser } from "./WorksBrowser";

function WorksBrowserFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-2xl bg-surface text-[0.875rem] text-muted ring-1 ring-black/[0.04]">
      加载作品集…
    </div>
  );
}

export function WorkList({ works }: { works: Work[] }) {
  return (
    <Suspense fallback={<WorksBrowserFallback />}>
      <WorksBrowser works={works} />
    </Suspense>
  );
}
