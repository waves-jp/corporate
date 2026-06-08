import { Section } from "./Section";
import { LoopDiagram } from "./LoopDiagram";

const outcomes = [
  {
    k: "Before",
    v: "改善のたびに専門人材が手を動かす必要があり、属人的で止まりやすい",
  },
  {
    k: "After",
    v: "専門知識のない担当者が、自分で改善サイクルを回せる状態になった",
  },
  {
    k: "本質的価値",
    v: "「自動化され、容易に動かせる反復処理」そのものが成果を生み続ける",
  },
];

export function Work() {
  return (
    <Section
      id="work"
      index="02"
      label="Work / 代表実績"
      title={
        <>
          自己像を<span className="text-accent">証明する</span>、目玉の実績。
        </>
      }
    >
      {/* 目玉事例 */}
      <div className="rounded-sm border border-line-strong bg-background">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 sm:px-8">
          <span className="label text-accent">Featured Case</span>
          {/* TODO[要確認]: 守秘義務の線引き。企業名/固有情報の記載可否は羽田が最終判断 */}
          <span className="label">企業情報はプレースホルダ扱い</span>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <h3 className="mb-4 text-2xl font-semibold leading-snug">
            「自動で改善が回る仕組み」そのものを構築
          </h3>
          <p className="mb-10 max-w-2xl leading-relaxed text-muted">
            アプリ改善のプロセス自体を自動化した。デザインガイドラインとコードの差分を
            AIが検出し、改善チケットを自動生成、そのまま自動で実装まで繋げる。
            出力品質が悪ければプロンプトを調整して精度を上げる——この一連を、止めずに回し続ける仕組みにした。
          </p>

          <LoopDiagram />

          <dl className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.k} className="bg-background p-5">
                <dt className="label mb-2">{o.k}</dt>
                <dd className="text-sm leading-relaxed">{o.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
            この事例は「やりっぱなしにしない / 仕組みを納める / 素人でも回せる」という
            自己像の3点すべてを、実際に作ったもので体現しています。
          </p>
        </div>
      </div>

      {/* その他実績（プレースホルダ） */}
      <div className="mt-10">
        <p className="label mb-4">Other Work</p>
        {/* TODO[要確認]: 掲載するその他実績の有無と内容を羽田が提供・選定。目玉を埋もれさせない */}
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {[1, 2].map((n) => (
            <div key={n} className="bg-background p-6">
              <span className="font-mono text-xs text-muted">0{n}</span>
              <h4 className="mt-2 font-semibold">その他の開発実績（仮）</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                スペースに応じて簡潔に掲載予定。内容は実装時に確定します。
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
