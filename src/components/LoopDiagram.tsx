import { loopSteps } from "@/lib/profile";

export function LoopDiagram() {
  return (
    <div className="rounded-sm border border-line bg-surface/50 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="label">improvement_loop</span>
        <span className="label flex items-center gap-2 text-accent">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          running
        </span>
      </div>

      <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-5">
        {loopSteps.map((step, i) => (
          <li key={step.id} className="relative flex flex-col bg-background p-4">
            <span className="font-mono text-xs text-accent">{step.id}</span>
            <span className="mt-2 text-sm font-semibold">{step.label}</span>
            <span className="mt-2 text-xs leading-relaxed text-muted">
              {step.desc}
            </span>
            {i < loopSteps.length - 1 && (
              <span
                aria-hidden
                className="absolute right-1 top-4 font-mono text-line-strong sm:right-2"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-3 font-mono text-xs text-accent">
        <span>↻</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        <span>05 から 01 へ。品質が出るまで自動で回り続ける</span>
      </div>
    </div>
  );
}
