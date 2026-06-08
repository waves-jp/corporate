import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-32">
        <p className="label reveal mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent" />
          {profile.nameEn} — Full-cycle AI Engineer
        </p>

        <h1 className="reveal max-w-4xl text-[2.6rem] font-semibold leading-[1.15] tracking-tight sm:text-6xl">
          AIで<span className="text-accent">&ldquo;作って終わり&rdquo;</span>に
          しない。
          <br />
          改善され続ける<span className="whitespace-nowrap">仕組み</span>まで、
          <br className="hidden sm:block" />
          一人で作る。
        </h1>

        <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          課題発見から実装、そして「結果が出続ける改善の仕組み」までを一人で作りきる、
          AI業務改善のフルサイクルエンジニアです。納めるのは成果物そのものではなく、
          専門知識がなくても回せる、自動で改善され続ける仕組み。
        </p>

        <div className="reveal mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            代表実績を見る
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#value"
            className="border border-line-strong px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            考え方を読む
          </a>
        </div>
      </div>

      <div className="label absolute bottom-6 left-1/2 -translate-x-1/2 animate-pulse">
        scroll ↓
      </div>
    </section>
  );
}
