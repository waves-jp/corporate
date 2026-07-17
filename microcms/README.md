# microCMS セットアップ手順

ブログ・セミナー機能で使う microCMS の準備手順。スキーマ定義はこのディレクトリの JSON をインポートする。

## 1. API の作成（3つ）

### categories（先に作る）

1. microCMS 管理画面 →「API作成」→「自分で決める」
2. API名: `カテゴリ` / エンドポイント: `categories`
3. API型: **リスト形式**
4. スキーマ定義画面で「インポート」を選び `api-categories-schema.json` を読み込む

### blogs

1. 「API作成」→「自分で決める」
2. API名: `ブログ` / エンドポイント: `blogs`
3. API型: **リスト形式**
4. スキーマ定義画面で「インポート」を選び `api-blogs-schema.json` を読み込む
5. `category` フィールドの参照先が未設定になっている場合は、フィールド設定で **categories** を選択する

### seminars

1. 「API作成」→「自分で決める」
2. API名: `セミナー` / エンドポイント: `seminars`
3. API型: **リスト形式**
4. スキーマ定義画面で「インポート」を選び `api-seminars-schema.json` を読み込む
   - フィールド: title / description / body / eyecatch / date（開催日時・必須）/ format（セレクト: オンライン・オフライン・ハイブリッド・必須）/ venue / capacity / fee / applyUrl
5. 開催日時（date）を過ぎたセミナーは自動で「終了」表示になる

> インポートがエラーになる場合は、各 JSON の `apiFields` の内容を見ながら手動でフィールドを作成しても同じ。

## 2. カテゴリの初期データ

`categories` に以下のようなコンテンツを作成する（コンテンツIDはURLに使われるので半角英数で）。

| コンテンツID | name     |
| ------------ | -------- |
| `ai`         | AI活用   |
| `dev`        | 開発     |
| `news`       | お知らせ |

## 3. 環境変数

microCMS 管理画面 →「権限管理」→「APIキー」で **GET のみ許可** のキーを確認し、以下を設定する。

```bash
# .env.local（ローカル）
MICROCMS_SERVICE_DOMAIN=xxxx        # https://xxxx.microcms.io の xxxx 部分
MICROCMS_API_KEY=xxxxxxxxxxxx
MICROCMS_WEBHOOK_SECRET=任意のランダム文字列
```

Vercel にも同じ3つを設定する（Production / Preview 両方）。

## 4. Webhook（公開時に即時反映させる）

microCMS 管理画面 → `blogs` / `seminars` 各API →「API設定」→「Webhook」→「カスタム通知」

- URL: `https://www.waves-jp.com/api/revalidate`
- シークレット: `MICROCMS_WEBHOOK_SECRET` と同じ値
- 通知タイミング: コンテンツの公開・更新・削除

※ Webhook 未設定でも60秒間隔の ISR で自動反映される。

## コンテンツ作成時の注意

- **コンテンツIDがURLになる**（`/blog/{コンテンツID}` / `/seminar/{コンテンツID}`）。作成時に `my-first-post` のような英数字スラッグへ書き換えること
- アイキャッチは 1200×630 推奨（OGP を兼ねるため）
- セミナーの申込みURL（applyUrl）が未設定の間は「受付開始までお待ちください」と表示される

### 本文に関連記事のプレビューカードを置く

1. 本文のカードを置きたい位置に、リンク先の記事URL（例: `https://www.waves-jp.com/blog/part-2`）を入力する
2. URLを選択して、リッチエディタのリンク機能で同じURLを設定する
3. その段落にはリンク以外の文字を入れず、単独行にする

公開時に、リンク先のアイキャッチ・タイトル・説明文を使ったカードへ自動変換される。`/blog/part-2` のような相対URLも使用可能。文章中に置いたリンクや外部サイトへのリンクは、通常のテキストリンクとして表示される。

## Linearからブログ下書きを半自動生成する

GitHub Actions、専用APIキー権限、Linearステータス、初回dry-run、公開前チェックの詳細は[`docs/blog-draft-automation.md`](../docs/blog-draft-automation.md)を参照。
