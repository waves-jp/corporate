/**
 * サイト掲載情報の集約ファイル。
 * 掲載テキスト・事例・サービス内容はここを唯一の編集点とする。
 */

export const profile = {
  // ブランド（屋号）。サイトの名義はこちら。
  brand: 'WAVES',
  // ブランドの中の人
  nameJa: '羽田 涼太郎',
  nameEn: 'Ryotaro Hada',

  email: 'ryotarohada@waves-jp.com',

  // 所在地
  address: '〒721-0955 広島県福山市新海町6-8-3-205',

  title: 'FOUNDER / SOFTWARE ENGINEER / AI CONSULTANT',

  bio: [
    '1997年、広島県福山市出身。',
    '2018年よりソフトウェアエンジニアとしてキャリアをスタート。',
    '東京のWeb制作会社でウェブサイト/アプリケーション開発に従事。',
    '2021年に独立後、福山を拠点に東京の大手スタートアップ企業や地元企業の開発・業務改善に幅広く参画。',
    'その経験を活かし、現在はAIコンサルタントとしての事業にも積極的に取り組む。',
  ],

  // TODO[要確認]: 各プロフィールURL（暫定でトップを指定。確定したら差し替え）
  links: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'Zenn', href: 'https://zenn.dev/' },
  ] as { label: string; href: string }[],
} as const

/** 提供サービス（トップの3カード） */
export const services = [
  {
    id: 'S-01',
    title: 'AIコンサルティング',
    desc: ['個人/事業問わず対応。', '事業課題を分解し、活用の道筋を提案。'],
  },
  {
    id: 'S-02',
    title: 'ソフトウェア開発',
    desc: [
      'ウェブサイト/アプリケーションを開発。',
      'AI組み込みによる新しい価値を提案。',
    ],
  },
  {
    id: 'S-03',
    title: 'AI人材育成・内製化支援',
    desc: ['現場が自走できるまで、', '研修と伴走を支援。'],
  },
] as const

/** サービス詳細（/service の各セクション） */
export const serviceDetails = [
  {
    id: 's1',
    code: '(S-01) AI CONSULTING',
    title: 'AIコンサルティング',
    lead: [
      '現状の課題を分解し、AI活用の道筋を描きます。',
      '「何から始めればいいか分からない」という段階からのご相談も歓迎です。',
    ],
    items: [
      {
        title: '課題整理・活用診断',
        desc: '業務を棚卸しし、AIに任せられる領域を特定します。',
      },
      {
        title: '導入戦略の策定',
        desc: '費用対効果を見極め、優先順位と道筋を設計します。',
      },
      {
        title: 'ツール選定・PoC支援',
        desc: '最適なツールの選定と、小さな検証からの導入を支援します。',
      },
    ],
  },
  {
    id: 's2',
    code: '(S-02) SOFTWARE DEVELOPMENT',
    title: 'ソフトウェア開発',
    lead: [
      'ウェブサイトからアプリケーションまで、要件定義から実装・運用まで一貫して対応。',
      'AIの組み込みによって、業務に新しい価値を実装します。',
    ],
    items: [
      {
        title: 'ウェブサイト/アプリケーション開発',
        desc: '要件定義から設計・実装・運用まで一貫して対応します。',
      },
      {
        title: 'AI組み込み開発',
        desc: 'LLMなどのAI技術を活用した機能を、業務システムに組み込みます。',
      },
      {
        title: '既存システムへのAI統合',
        desc: 'いまの仕組みを活かしながら、段階的に拡張します。',
      },
    ],
  },
  {
    id: 's3',
    code: '(S-03) AI TRAINING / ENABLEMENT',
    title: 'AI人材育成・内製化支援',
    lead: [
      'ツールを導入するだけでは、定着しません。',
      '現場が自走できるようになるまで、研修と伴走で支援します。',
    ],
    items: [
      {
        title: 'AI活用セミナー',
        desc: '基礎から実務での使い方まで、レベルに合わせて設計します。',
      },
      {
        title: 'ハンズオン伴走',
        desc: '実際の業務を題材に、使いこなしを定着させます。',
      },
      {
        title: '内製化ロードマップ',
        desc: '組織にノウハウを残し、自走できる体制をつくります。',
      },
    ],
  },
] as const

/** 支援の進め方（フェーズ） */
export const phases = [
  { id: 'PHASE 1', label: '課題の可視化' },
  { id: 'PHASE 2', label: '戦略・要件設計' },
  { id: 'PHASE 3', label: '開発・実装' },
  { id: 'PHASE 4', label: '定着・内製化' },
] as const

/** 実績のカテゴリ（/works のフィルタ） */
export const workCategories = [
  { key: 'all', label: 'ALL' },
  { key: 'consulting', label: 'コンサルティング' },
  { key: 'dev', label: '開発' },
  { key: 'training', label: '人材育成' },
] as const

export type WorkCategoryKey = (typeof workCategories)[number]['key']

/** 実績一覧。トップには先頭2件を抜粋掲載する */
export const works = [
  {
    num: 'CASE-01',
    cat: 'dev',
    catLabel: '開発',
    theme: 'ナレッジ検索',
    industry: '製造業',
    company: '株式会社○○製作所',
    title: '散在する技術文書を、対話で引き出せる資産に。',
    desc: '数万件の社内ドキュメントを対象に検索AIを構築。調査にかかる時間を大幅に短縮。',
  },
  {
    num: 'CASE-02',
    cat: 'consulting',
    catLabel: 'コンサルティング',
    theme: '需要予測',
    industry: '小売',
    company: '○○ストア株式会社',
    title: '属人化していた需要予測を、仕組みに。',
    desc: '担当者の経験則をモデル化し、発注業務の精度と再現性を向上。',
  },
  {
    num: 'CASE-03',
    cat: 'dev',
    catLabel: '開発',
    theme: '帳票自動化',
    industry: '建設業',
    company: '株式会社○○建設',
    title: '紙とExcelの帳票処理を、自動化。',
    desc: '帳票の読み取りと転記をAI化し、事務作業の時間を大幅に削減。',
  },
  {
    num: 'CASE-04',
    cat: 'consulting',
    catLabel: 'コンサルティング',
    theme: 'チャットボット',
    industry: 'サービス業',
    company: '株式会社○○サービス',
    title: '問い合わせ対応を、24時間の窓口に。',
    desc: 'FAQを学習したチャットボットで一次対応を自動化し、対応品質を平準化。',
  },
  {
    num: 'CASE-05',
    cat: 'training',
    catLabel: '人材育成',
    theme: 'AI研修',
    industry: '士業',
    company: '○○法律事務所',
    title: '事務所全体で、AIを日常の道具に。',
    desc: '実務を題材にした研修と伴走で、文書作成業務の効率を改善。',
  },
  {
    num: 'CASE-06',
    cat: 'dev',
    catLabel: '開発',
    theme: '配車計画',
    industry: '物流',
    company: '○○運輸株式会社',
    title: 'ベテラン頼みの配車計画を、誰でも扱える形に。',
    desc: '制約条件を整理し、計画立案を支援するツールを開発。',
  },
] as const
