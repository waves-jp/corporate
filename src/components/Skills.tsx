import { Section } from "./Section";
import { profile, skillGroups } from "@/lib/profile";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Skills / 技術"
      title={
        <>
          作りきれる、<span className="text-accent">現役</span>の技術的裏付け。
        </>
      }
    >
      {/* 現役・最前線の明示（差別化上きわめて重要） */}
      <div className="mb-12 flex flex-col gap-6 rounded-sm border border-accent/30 bg-accent-dim p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="label text-accent">Currently active</span>
        </div>
        <p className="text-base leading-relaxed sm:text-lg">
          現在も<strong className="font-semibold">東京の上場企業</strong>で、
          AIを使った業務効率化に<strong className="font-semibold">実務として従事</strong>。
          エンジニア歴{profile.experienceYears}年、最前線で手を動かし続けています。
        </p>
      </div>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.title} className="bg-background p-8">
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{g.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border border-line-strong px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
