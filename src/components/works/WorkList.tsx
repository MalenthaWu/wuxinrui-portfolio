import { Suspense } from "react";
import type { Work } from "@/lib/types";
import { WorksBrowser } from "./WorksBrowser";

function WorksBrowserFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-2xl liquid-glass text-[0.875rem] text-muted">
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
