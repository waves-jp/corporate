# ブログ下書き半自動生成

Linearの原案をもとにOpenAI APIで調査・検証を行い、microCMSへ**未公開の下書き**を1日1件作成するGitHub Actionsです。公開処理は実装していません。校正、事実確認、アイキャッチ設定、公開は必ずmicroCMS管理画面で人間が行います。

## 処理の流れ

1. 毎日09:00 JSTにGitHub Actionsを起動する
2. Linearの`WAVES`ワークスペースで、対象プロジェクト内の`post`ラベル付きかつ`Todo`ステータスのissueを古い順に確認する
3. Linear識別子から作った固定content ID（例: `linear-wav-123`）がmicroCMSにない原案を1件選ぶ
4. OpenAI Responses API（既定: `gpt-5.6-luna`）のWeb Searchで原案の主張を調査・検証する
5. 本文、出典、検証メモを構造化出力で生成し、出典URLがWeb Search結果に含まれることを検査する
6. microCMSのPUT APIを`status=draft`付きで呼び出す
7. 保存後に`publishedAt`がないことを再取得して確認する
8. 下書き確認後、元のLinear issueを`In Review`へ移動する

`Todo`以外のissueはすべて対象外です。microCMS保存後、Linear更新前に処理が止まった場合も、固定content IDの下書きを検知してLinearだけ`In Review`へ移すため、記事を二重生成しません。同時実行もGitHub Actionsの`concurrency`で直列化しています。

調査元は記事本文末尾へ、AIの検証メモと編集上の注意はGitHub Actionsの実行サマリーへ残します。microCMSに管理用フィールドを追加する必要はありません。

## 1. microCMSの準備

### 自動生成専用APIキーを作る

Webサイト表示用のGET専用キーとは分けて、自動生成専用キーを作ります。権限は次だけに絞ります。

- GET
- 下書き全取得
- PUT

POST、PATCH、DELETEは不要です。PUTはコンテンツIDを指定した新規作成にだけ使い、スクリプトは既存記事を更新しません。

既存の`blogs`スキーマへフィールドを追加する必要はありません。自動生成時のcontent IDは一旦`linear-wav-123`の形式になるため、公開前に人間が記事内容に合ったURL用IDへ変更します。

## 2. Linearの準備

Linearの「Security & access」からPersonal API keyを作ります。APIキーが所属するワークスペースが`WAVES`で、issueの読み取りとステータス更新ができることを確認してください。

対象issueには以下が必要です。

- 対象プロジェクトに所属している
- `post`ラベルが付いている
- ステータスが`Todo`である
- タイトル、description、コメントのいずれかに原案がある（タイトルだけでも可）

キャンセル済みissueは自動実行の対象外です。

対象issueが属するLinearチームには、`Todo`と`In Review`という名前のステータスが必要です。別名を使う場合はGitHub Variablesの`LINEAR_SOURCE_STATE_NAME`、`LINEAR_REVIEW_STATE_NAME`で変更できます。

issueのタイトル、description、直近20件のコメントは記事生成のためOpenAI APIへ送信されます。APIキー、顧客の秘密情報、公開許可のない個人情報を原案へ含めないでください。OpenAI APIへのリクエストは`store: false`で送信します。

## 3. GitHubの設定

GitHubリポジトリの「Settings → Secrets and variables → Actions」で設定します。

### Secrets（必須）

| 名前                      | 値                                     |
| ------------------------- | -------------------------------------- |
| `LINEAR_API_KEY`          | Linear Personal API key                |
| `OPENAI_API_KEY`          | OpenAI API key                         |
| `MICROCMS_SERVICE_DOMAIN` | `https://xxxx.microcms.io`の`xxxx`部分 |
| `MICROCMS_WRITE_API_KEY`  | 上記の自動生成専用microCMS APIキー     |

### Variables（任意）

未設定時はスクリプト内の既定値を使います。プロジェクト名はLinear上の正式名称に合わせて設定することを推奨します。

| 名前                         | 既定値             |
| ---------------------------- | ------------------ |
| `LINEAR_WORKSPACE_NAME`      | `WAVES`            |
| `LINEAR_PROJECT_NAME`        | `コンサル立ち上げ` |
| `LINEAR_POST_LABEL`          | `post`             |
| `LINEAR_SOURCE_STATE_NAME`   | `Todo`             |
| `LINEAR_REVIEW_STATE_NAME`   | `In Review`        |
| `OPENAI_MODEL`               | `gpt-5.6-luna`     |
| `OPENAI_REASONING_EFFORT`    | `high`             |
| `MICROCMS_BLOG_ENDPOINT`     | `blogs`            |
| `MICROCMS_CATEGORY_ENDPOINT` | `categories`       |
| `BLOG_MAX_CANDIDATES`        | `100`              |

## 4. 初回確認

1. GitHubの「Actions → Generate microCMS blog draft → Run workflow」を開く
2. `issue_identifier`へテスト対象（例: `WAV-123`）を入力する
3. 最初は`dry_run`を有効にして実行する
4. 成功後、`dry_run`を無効にして再実行する
5. microCMSに記事が下書きで作られ、公開一覧やサイトに表示されないことを確認する
6. 元のLinear issueが`In Review`へ移動したことを確認する
7. GitHub Actionsの失敗通知を受け取れるよう、リポジトリの通知設定を確認する

手動実行で`issue_identifier`を省略すると、日次実行と同じく最初の未処理issueを選びます。

## 公開前チェックリスト

- Linear原案と本文の意図が一致している
- 本文末尾の参考資料を人間が開き、重要な数値・制度・引用を再確認した
- 原案と調査結果の差分、未確定事項を解消した
- 誇張、断定、機密情報、個人情報、顧客名の無断掲載がない
- タイトル、description、カテゴリ、コンテンツIDを整えた
- アイキャッチを設定した
- プレビューでレイアウトとリンクを確認した
- 最後に人間がmicroCMS管理画面から公開した

## 参照仕様

- [OpenAI Web Search](https://developers.openai.com/api/docs/guides/tools-web-search)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Linear GraphQL API](https://linear.app/developers/graphql)
- [Linear filtering](https://linear.app/developers/filtering)
- [microCMS PUT API](https://document.microcms.io/content-api/put-content)
- [microCMS APIキー権限](https://document.microcms.io/content-api/x-microcms-api-key)
