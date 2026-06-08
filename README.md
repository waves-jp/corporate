# corporate

WAVES オフィシャルサイト（リニューアル版）

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

## スクリプト

| コマンド             | 内容                         |
| -------------------- | ---------------------------- |
| `npm run dev`        | 開発サーバー起動 (port 4000) |
| `npm run build`      | 本番ビルド                   |
| `npm run start`      | 本番サーバー起動 (port 4000) |
| `npm run lint`       | ESLint                       |
| `npm run typecheck`  | 型チェック                   |
| `npm run format`     | Prettier 整形                |

## ディレクトリ構成

```bash
src/
  ├ app/            # App Router (layout, page, globals.css)
  └ components/     # UIコンポーネント (Header, Hero, About, ...)
```

## メモ

トップページはセクション単位（Hero / About / Services / News / Contact）に分割した
プレースホルダ構成です。実コンテンツは各コンポーネントに差し込んでいきます。
