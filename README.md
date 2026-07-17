# corporate

WAVES オフィシャルサイト（リニューアル版）

WAVES（羽田涼太郎 / Ryotaro Hada）— AI業務改善のフルサイクルエンジニアリングを
打ち出すシングルページサイト。`SPEC.md` を要件定義書として制作。

## 技術スタック

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- [Tailwind CSS v4](https://tailwindcss.com/)
- TypeScript

## 開発環境

Node.js のバージョン管理に [Volta](https://docs.volta.sh/guide/) を使用しています（`node@20.15.0` 固定）。

```bash
npm install
npm run dev
```

`http://localhost:4000/` で開発サーバーが起動します。

## Google Analytics 4

GA4 プロパティの測定IDを、ホスティング環境の環境変数
`NEXT_PUBLIC_GA_MEASUREMENT_ID` に設定してください（例: `G-XXXXXXXXXX`）。
ローカル開発では `.env.local` に同じ値を設定できます。未設定時は計測スクリプトを
読み込まないため、開発環境ではそのまま動作します。

## スクリプト

| コマンド            | 内容                         |
| ------------------- | ---------------------------- |
| `npm run dev`       | 開発サーバー起動 (port 4000) |
| `npm run build`     | 本番ビルド                   |
| `npm run start`     | 本番サーバー起動 (port 4000) |
| `npm run lint`      | ESLint                       |
| `npm run typecheck` | 型チェック                   |
| `npm run format`    | Prettier 整形                |

## ディレクトリ構成

```bash
src/
  ├ app/            # App Router (layout, page, globals.css)
  ├ components/     # UIコンポーネント (Hero, Value, Work, Skills, Contact, ...)
  └ lib/profile.ts  # 掲載情報の集約（連絡先・リンク・スキル・実績ループ）
```

## メモ

シングルページ構成。セクションは Hero / Value（自己像）/ Work（代表実績）/
Skills / Contact。掲載する個人・実績情報は `src/lib/profile.ts` に集約しており、
`TODO[要確認]` コメントの箇所が確定待ち（外部リンクURL等）。
