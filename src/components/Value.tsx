import { Section } from "./Section";

const values = [
  {
    no: "01",
    title: "一人で全工程をやりきる",
    lead: "フルサイクル",
    body: "課題発見・設計・実装・運用・改善までを分業せず一貫して担う。だから「提案と実物のズレ」も「作りっぱなし」も起きない。工程の継ぎ目で失われる情報がない。",
  },
  {
    no: "02",
    title: "納めるのは“仕組み”であって“成果物”ではない",
    lead: "システムを納品する",
    body: "一度きりの納品物ではなく、使うほど良くなり続ける仕組みそのものを作る。だから「作って終わり」にならず、納品後も成果が出続ける。",
  },
  {
    no: "03",
    title: "専門知識がなくても回せる状態にする",
    lead: "自走する仕組み",
    body: "仕組みを使う側の担当者が、自分で改善サイクルを回せるようにする。だから作り手がいなくなっても、成果は継続して生まれ続ける。",
  },
];

export function Value() {
  return (
    <Section
      id="value"
      index="01"
      label="Value / 自己像"
      title={
        <>
          価値は、<span className="text-accent">&ldquo;やりっぱなしにしない&rdquo;</span>
          こと。
        </>
      }
    >
      <p className="mb-14 max-w-2xl text-lg leading-relaxed text-muted">
        「コンサルして終わり」でも「作って納品して終わり」でもない。
        分業による継ぎ目の損失をなくし、成果が継続する状態までを設計する——
        その姿勢を、3つの原則で言語化します。
      </p>

      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {values.map((v) => (
          <article
            key={v.no}
            className="flex flex-col bg-background p-8 transition-colors hover:bg-surface"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-2xl text-accent">{v.no}</span>
              <span className="label">{v.lead}</span>
            </div>
            <h3 className="mb-4 text-xl font-semibold leading-snug">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{v.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
