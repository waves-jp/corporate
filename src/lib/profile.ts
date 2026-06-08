/**
 * サイト掲載情報の集約ファイル。
 * SPEC 8章「確定が必要な項目」に対応。羽田が最終確定するまでは
 * プレースホルダ（TODO コメント付き）のまま運用する。
 */

export const profile = {
  nameJa: "羽田涼太郎",
  nameEn: "Ryotaro Hada",

  // TODO[要確認]: 公開する連絡先メールアドレス
  email: "ryotarohada@gmail.com",

  // TODO[要確認]: 掲載する外部リンク（不要なものは削除）
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
  ] as { label: string; href: string }[],

  experienceYears: 7,
} as const;

/** スキル / 技術。TODO[要確認]: 実際のスタックに合わせて調整 */
export const skillGroups = [
  {
    title: "フルスタック開発 / Web",
    summary:
      "要件定義からフロント・バックエンド・インフラまで、Webプロダクトを一気通貫で構築する。",
    items: ["TypeScript", "React / Next.js", "Node.js", "Python", "Cloud / IaC"],
  },
  {
    title: "生成AI の業務実装",
    summary:
      "Claude 等の生成AIを「デモ」ではなく業務に組み込み、運用に耐える形まで作りきる。",
    items: [
      "Claude / Anthropic API",
      "エージェント / ツール実行",
      "RAG",
      "評価・改善ループ設計",
      "プロンプト設計",
    ],
  },
] as const;

/** 改善が回り続ける仕組みのループ（目玉事例の中核ビジュアル） */
export const loopSteps = [
  { id: "01", label: "差分検出", desc: "デザインガイドラインとコードの差分をAIが検出する" },
  { id: "02", label: "チケット生成", desc: "検出した差分から改善チケットを自動生成する" },
  { id: "03", label: "自動実装", desc: "チケットをそのまま自動で実装まで繋げる" },
  { id: "04", label: "品質評価", desc: "出力品質を確認し、基準を満たすか判定する" },
  { id: "05", label: "プロンプト調整", desc: "品質が低ければプロンプトを調整し精度を上げる" },
] as const;
