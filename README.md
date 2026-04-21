# AI Test Lab

[AI駆動開発の実践ガイド](https://github.com/takuma39/ai)に基づく、**テスト自動化検証用アプリケーション**です。  
AI（Claude Code）を活用したテスト駆動開発（AI-TDD）のベストプラクティスを実証するためのテストベッドとして構築しています。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js (App Router) |
| UI | shadcn/ui + Tailwind CSS |
| データベース | PostgreSQL + Prisma ORM |
| 認証 | NextAuth.js |
| ユニットテスト | Vitest |
| E2Eテスト | Playwright |
| API仕様管理 | Apidog |

## プロジェクト構成

```
ai-test/
├── .claude/                          # AI エージェント設定
│   ├── agents/                       # sub-agent 定義
│   │   └── test-engineer.md          # テストエンジニア agent
│   └── skills/                       # 共有ナレッジ
│       └── test-guidelines.md        # テストガイドライン
├── docs/                             # 設計ドキュメント
│   ├── spec/
│   │   └── SPEC.md                   # 仕様書（BDD形式）
│   ├── basic_design/
│   │   └── BASIC_DESIGN.md           # 基本設計書（構成図・ER図・API設計）
│   ├── detail_design/
│   │   └── DETAIL_DESIGN.md          # 詳細設計書（コンポーネント・スキーマ・シーケンス図）
│   └── design/
│       └── UI_MOCK_PROMPT.md         # UIモック作成用プロンプト
├── src/                              # アプリケーションコード（未作成）
├── tests/e2e/                        # E2Eテスト（未作成）
├── .mcp.json                         # MCP サーバー設定（fetch / Playwright）
├── CLAUDE.md                         # AI開発エージェントの行動規範
└── README.md                         # 本ファイル
```

---

## AI を活用した開発の進め方

本プロジェクトでは、AI駆動開発の手法を実践的に学べます。以下にAIの使い方を解説します。

### 1. CLAUDE.md — AI への「プロジェクト憲法」

`CLAUDE.md` は Claude Code がプロジェクトで作業する際に**最初に参照するファイル**です。

- **テスト方針**: ユニットテストは Vitest、E2Eテストは Playwright
- **禁止事項**: `.env` の読み書き禁止、BDDシナリオの勝手な削除禁止
- **コーディング規約**: TypeScript strict mode、Zod バリデーション必須

> 💡 CLAUDE.md はプロジェクトの「ルール」を AI に伝える最も重要なファイルです。肥大化しないよう、詳細は skills ファイルに切り出してください。

### 2. Skills — AI の「共有ナレッジ」

`.claude/skills/` に配置するファイルで、AI に特定ドメインの知識やルールを注入します。

#### 現在の Skills

| ファイル | 内容 |
|---|---|
| `test-guidelines.md` | テスト規約（AI-TDD、AAAパターン、Zodエッジケース） |

#### 使い方（Claude Code での参照例）

```
@.claude/skills/test-guidelines.md を参照して、loginFormSchema のユニットテストを書いて
```

プロンプト内で `@ファイルパス` と指定するだけで、AI がそのファイルを読み込んでルールに従ったコードを生成します。

### 3. Sub-agents — AI の「専門チーム」

`.claude/agents/` に定義するファイルで、役割に特化した独立エージェントを呼び出せます。

#### 現在の Agents

| ファイル | 役割 |
|---|---|
| `test-engineer.md` | SPEC.md からテスト漏れを検出し、テストコードを生成・修復する |

#### 使い方（Claude Code での呼び出し例）

```
test-engineer agent を使って、現在のテストカバレッジの分析レポートを作成して
```

Sub-agent はメインセッションとは**コンテキストが隔離**されているため、大量のファイルを解析してもメインの会話を汚しません。

### 4. MCP — AI と外部ツールの「接続」

MCP（Model Context Protocol）を使うと、AI が外部ツールやデータソースにリアルタイム接続できます。  
設定は `.mcp.json` に記載済みで、APIキー・会員登録は不要です。

#### ✅ 設定済みMCPサーバー

| MCP | 用途 | 使い方の例 |
|---|---|---|
| **mcp-server-fetch** | 任意のURLからドキュメントを取得しMarkdown変換 | `fetch MCPで Next.js の認証ドキュメントを取得して` |
| **Playwright MCP** | E2Eテスト自動操作・スクリーンショット差分 | `Playwright MCPでログイン画面のE2Eテストを実行して` |

> 💡 よく参照するドキュメントURLは `.claude/skills/doc-references.md` にまとめてあります。  
> `@.claude/skills/doc-references.md` を参照して、fetch MCP で取得するURLを確認できます。

#### 📋 将来追加予定のMCPサーバー

| MCP | 用途 | 導入タイミング |
|---|---|---|
| **next-devtools-mcp** | Next.js開発サーバーの状態取得・エラー診断 | Next.jsセットアップ後 |
| **Apidog MCP** | OpenAPI仕様参照・テストケース自動生成 | API設計フェーズ |
| **Postgres MCP** | DBスキーマ参照・クエリ実行支援 | 実装フェーズ |

### 5. 開発ワークフロー

AI駆動開発では、以下のフローで進めます：

```
1. 仕様書を書く（SPEC.md）
    ↓
2. UIモックを生成する（UI_MOCK_PROMPT.md → v0.dev / Figma AI）
    ↓
3. 失敗するテストを先に書く（AI-TDD）
    ↓
4. AIにテストを通す実装を生成させる
    ↓
5. 人間がレビュー・承認する
    ↓
6. E2Eテストで全体を検証する
```

> ⚠️ **重要**: AI 生成コードも必ず人間がレビューしてください。最終的な品質・セキュリティの責任は人間が担います。

---

## セットアップ（予定）

> 以下は実装フェーズで追記予定です。

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ユニットテストの実行
npx vitest run

# E2Eテストの実行
npx playwright test
```

---

## 関連ドキュメント

| ドキュメント | パス / URL | 説明 |
|---|---|---|
| 仕様書 | `docs/spec/SPEC.md` | BDD形式の機能要件・テスト基準 |
| UIモックプロンプト | `docs/design/UI_MOCK_PROMPT.md` | AIデザインツール向けプロンプト |
| テストガイドライン | `.claude/skills/test-guidelines.md` | AI-TDD・AAAパターン規約 |
| AI駆動開発ガイド | [github.com/takuma39/ai](https://github.com/takuma39/ai) | 開発プロセス全体の実践ガイド（外部リポジトリ） |

## ライセンス

MIT
