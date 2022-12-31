# Boilerplate_Next

## 概要

Next.js × Chakra UI テンプレート

## 開発環境構築方法

### 1. Node.js、yarn のインストール

Volta を使用しています。公式ドキュメントを確認の上インストールしてください。

[Volta documents](https://docs.volta.sh/guide/)

- Node.js v16.17.0 (2022/9/11 時点 LTS)
- Yarn v1.22.19 (2022/9/11 時点 LTS)

### 2. 開発サーバー起動

```bash
npm install or yarn install
npm run dev or yarn dev
```

`http://localhost:3000/`にて開発サーバー起動。

### 本番ビルド、サーバー起動

以下コマンドで静的アセットを出力。また、本番モードでアプリケーション起動。

```bash
npm run build
or
yarn build

npm run start
or
yarn start
```

### テンプレートの src ディレクトリ構成

```bash
src/
  ├ components/
  │  ├ parts/
  │  └ templates/
  │
  ├ constants/ (定数ファイルなど)
  │  ├ env/ (環境変数)
  │  └ url/ (アプリケーションのURLを指定)
  │
  ├ lib/
  │  └ seo/ (meta系)
  │
  ├ pages/
  │  ├ _document.tsx
  │  ├ _app.tsx
  │  └ index.tsx
  │
  ├ services/（データフェッチ関連の関数）
  │  └ user/
  │
  ├ theme/ (Chakra UIのカスタムテーマ)
  │
  ├ types/
  │  ├ api.d.ts
  │  └ global.d.ts
  :
```

### カスタムテーマについて

Chakra UI のカスタムテーマ機能を使用し、独自の設定を行なっています。

対象のソースコードは`/src/theme`を参照ください。

#### provider

カスタムテーマを設定するための provider コンポーネントを提供しています。

テーマオプションをラップしているのでコンポーネントをそのまま記述することでテーマを設定できます。

#### options

Chakra UI の theme 関数の引数に渡すオプションを提供します。

### colorModeScript

colorModeScript をラップしたプロバイダーを提供します。

colorMode の設定ファイルは`theme/options/mode`を参照してください。

### npm scripts

1. `dev`
   開発サーバー起動

https://nextjs.org/docs/api-reference/cli#development

2. `build`
   production 用のファイルを出力。

https://nextjs.org/docs/api-reference/cli#build

3. `start`
   本番モードでアプリケーションを起動する

https://nextjs.org/docs/api-reference/cli#production

4. `lint`
   ESLint チェックを行う

https://nextjs.org/docs/api-reference/cli#lint

5. `prettier`
   Prettier でコード整形する

https://prettier.io/docs/en/cli.html

6. `prettier:check`
   Prettier で整形されているかコードをチェックする

https://prettier.io/docs/en/cli.html#--check
