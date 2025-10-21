# 相性診断サイト（Next.js + TypeScript + Tailwind）README

## 概要

このプロジェクトは、ユーザーが事前に調べた占い情報（星座・血液型・MBTI・四柱推命など）を二人分フォーム入力し、そのデータをサーバーサイドで集約して OpenAI API に送信し、総合的な人物像／相性評価を生成する相性診断ウェブアプリです。結果はカード形式でスマホフレンドリーに表示され、クロス集計（例：ENTP × てんびん座 等）に基づく「相性の良いポイント」「注意点」「総合相性パーセント」「総評」などを出力します。

## 主な機能

* 2名分の占い情報入力フォーム（ニックネーム、星座、血液型、MBTI、四柱推命、九星気学、六星占術、算命学（中心星）、干支、エニアグラム、動物占い）
* サーバーサイドでの OpenAI API 呼び出しによる総合解析
* 各人物像（約300文字）を自動生成
* 相性の良いポイント7個・注意点3個（複合条件のクロス集計）
* 総合相性パーセント
* 総評（約500文字）
* レスポンシブ（スマホ最適化）、シンプルなカードUI
* Vercel デプロイ対応、サブドメイン運用可
* GitHubでソース管理、CIは任意（推奨：Vercel＋GitHub連携）

## 想定技術スタック

* フロントエンド：Next.js（App Router / Pagesどちらでも可） + TypeScript
* スタイリング：Tailwind CSS
* サーバー/API：Next.js API Routes（Node.js）
* OpenAI 連携：サーバーサイドで OpenAI API（ChatCompletions / Responses）
* デプロイ：Vercel
* 開発ツール：pnpm / npm / yarn（任意）
* データ保存（任意・将来的）：Firestore / Supabase / MongoDB など
* 認証（任意）：メール認証・OAuth（将来的に導入検討）

## フォルダ構成

```
/
├─ app/ or pages/         # Next.js ページ（入力ページ、結果ページ）
├─ components/            # UI コンポーネント（Form, Card, ResultList）
├─ lib/                   # OpenAI 呼び出し・ユーティリティ
├─ styles/                # Tailwind のカスタム
├─ pages/api/             # API ルート（/api/analyze など）
├─ public/                # 画像や静的ファイル
├─ README.md
├─ next.config.ts
├─ package.json
```

## API（設計メモ）

* `POST /api/analyze`

  * リクエストボディ：2名分の占い情報（JSON）
  * サーバーで入力整形・プロンプト生成 → OpenAI API 呼び出し
  * レスポンス：生成された人物像（各300文字）、相性ポイント7・注意点3、総合パーセント、総評（500文字）などを構造化して返却
* セキュリティ：OpenAI API Key はサーバー側でのみ利用。フロントに漏らさない。

## ローカルセットアップ（開発者向け）

### 要件

* Node.js 16+（推奨 18+）
* pnpm / npm / yarn
* Vercel アカウント（デプロイ用）
* OpenAI API キー

### 手順（例）

1. リポジトリをクローン

```bash
git clone <repo-url>
cd <repo>
```

2. 依存インストール

```bash
pnpm install
# または
npm install
```

3. 環境変数を設定（`.env.local` をルートに作成）

```
OPENAI_API_KEY=sk-xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

※OpenAIキーは必ずサーバー側でのみ使用。`NEXT_PUBLIC_` で始まる環境変数には平文で公開されるため、APIキーは含めないこと。

4. 開発サーバー起動

```bash
pnpm dev
# または
npm run dev
```

5. `http://localhost:3000` にアクセスして動作確認

## デプロイ（Vercel）

1. GitHub リポジトリを Vercel と連携
2. 環境変数（OPENAI_API_KEY など）を Vercel プロジェクトの Settings > Environment Variables に登録
3. デプロイブランチ（main / master）に push すると自動デプロイ
4. サブドメインを設定する場合は Vercel のドメイン設定から追加

## セキュリティ・プライバシー

* ユーザーデータ（個人情報に該当し得る入力）は適切に取り扱うこと。ログ保存、第三者提供については規約・プライバシーポリシーを整備してください。
* OpenAI に送信するプロンプトには、個人を特定しうる情報を含めない方針を設けるか、ユーザー同意を明確に取ることを推奨します。
* サーバーサイドでのレートリミッティング、悪意ある入力のバリデーション、不正利用のモニタリングを実装してください。

## テスト

* 単体テスト：Jest / React Testing Library などでコンポーネントやユーティリティをカバー
* API テスト：API ルートのエンドツーエンドテスト（Supertest 等）
* E2E：Playwright / Cypress を使った主要フロー（入力→生成→結果表示）の確認

## 拡張案（将来的な収益性向上）

* ユーザー登録・マイページ機能を追加し、結果の保存・履歴管理を提供（有料プランで履歴保持／詳細レポート）
* プレミアム解析：より詳細な相性レポート（PDF）を有償販売
* 広告やアフェリエイト連携、イベント連携（地域ベースのオフ会／ワークショップ等）
* API による外部コンテンツ連携（SNSシェア、結果を元にしたおすすめイベント）