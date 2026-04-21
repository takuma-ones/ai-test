# プロジェクト概要

Next.jsベースのAI自動テスト検証環境。
AI駆動開発のベストプラクティスを実証するためのテストベッドアプリケーション。

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **DB**: PostgreSQL + Prisma ORM
- **認証**: NextAuth.js
- **テスト**: Vitest (ユニット) + Playwright (E2E)

## テスト方針

- ユニットテスト: Vitest (ファイル名: `*.test.ts`)
- E2Eテスト: Playwright (`tests/e2e/`)
- テストは AI-TDD（テスト駆動開発）で進める。失敗するテストを先に書くこと。
- AAAパターン（Arrange, Act, Assert）を遵守すること。

## MCP 設定

`.mcp.json` で以下の MCP サーバーを設定済み（すべてAPIキー・会員登録不要）。

| MCP | 用途 | 使い方 |
|---|---|---|
| `mcp-server-fetch` | 公式ドキュメントをMarkdown変換して取得 | `fetch MCPで [URL] を取得して` |
| `@playwright/mcp` | E2Eテストのブラウザ自動操作 | `Playwright MCPでログインフローをテストして` |

- ドキュメント参照用の URL 一覧は `@.claude/skills/doc-references.md` を参照
- Next.js セットアップ後に `next-devtools-mcp` を追加予定

## ディレクトリ構造

```
docs/spec/SPEC.md          # 仕様書
docs/basic_design/         # 基本設計書
docs/detail_design/        # 詳細設計書
.claude/skills/            # 共有ナレッジ・手順
.claude/agents/            # 専門エージェント定義
src/                       # アプリケーションコード
tests/e2e/                 # E2Eテスト
```

## コーディング規約

- TypeScript strict mode を有効化すること
- Zodによるランタイムバリデーションを必須とする
- Server Actions / API Routes にはエラーハンドリングを必ず実装する

## 禁止事項

- `.env` ファイルの読み取り・出力禁止。
- テスト要件（BDDのGiven/When/Then）の勝手な削除禁止。
- `any` 型の使用禁止（`unknown` を使用すること）。
- テストのスキップ（`.skip`）をコミットに含めないこと。
