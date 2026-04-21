---
name: doc-references
---

# ドキュメント参照ガイド

fetch MCP を使って公式ドキュメントを参照する際のURLリストと手順。
Context7 MCP の代替として、`mcp-server-fetch` 経由で最新の公式ドキュメントを取得する。

## 使い方

Claude Code で以下のように指示する：

```
fetch MCPを使って、Next.js App Router のルーティング仕様を取得して
```

## 主要ドキュメントURL一覧

### Next.js (App Router)

| トピック | URL |
|---|---|
| App Router 概要 | https://nextjs.org/docs/app |
| ルーティング | https://nextjs.org/docs/app/building-your-application/routing |
| Server Components | https://nextjs.org/docs/app/building-your-application/rendering/server-components |
| Server Actions | https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations |
| Middleware | https://nextjs.org/docs/app/building-your-application/routing/middleware |
| 認証パターン | https://nextjs.org/docs/app/building-your-application/authentication |

### shadcn/ui

| トピック | URL |
|---|---|
| インストール (Next.js) | https://ui.shadcn.com/docs/installation/next |
| コンポーネント一覧 | https://ui.shadcn.com/docs/components |
| Form | https://ui.shadcn.com/docs/components/form |
| Input | https://ui.shadcn.com/docs/components/input |
| Select | https://ui.shadcn.com/docs/components/select |
| DatePicker | https://ui.shadcn.com/docs/components/date-picker |
| Checkbox | https://ui.shadcn.com/docs/components/checkbox |
| Switch | https://ui.shadcn.com/docs/components/switch |

### Vitest

| トピック | URL |
|---|---|
| 入門ガイド | https://vitest.dev/guide/ |
| API リファレンス | https://vitest.dev/api/ |
| テストのモック | https://vitest.dev/guide/mocking |
| カバレッジ | https://vitest.dev/guide/coverage |

### Playwright

| トピック | URL |
|---|---|
| 入門ガイド | https://playwright.dev/docs/intro |
| テストの書き方 | https://playwright.dev/docs/writing-tests |
| ロケーター | https://playwright.dev/docs/locators |
| アサーション | https://playwright.dev/docs/test-assertions |
| 認証テスト | https://playwright.dev/docs/auth |
| MCP サーバー | https://playwright.dev/docs/mcp |

### Prisma

| トピック | URL |
|---|---|
| クイックスタート | https://www.prisma.io/docs/getting-started/quickstart |
| スキーマ定義 | https://www.prisma.io/docs/orm/prisma-schema |
| マイグレーション | https://www.prisma.io/docs/orm/prisma-migrate |
| Prisma Client | https://www.prisma.io/docs/orm/prisma-client |

### NextAuth.js (Auth.js)

| トピック | URL |
|---|---|
| 入門ガイド | https://authjs.dev/getting-started |
| Prisma アダプタ | https://authjs.dev/getting-started/adapters/prisma |
| セッション管理 | https://authjs.dev/getting-started/session-management |

### Zod

| トピック | URL |
|---|---|
| 基本型 | https://zod.dev/?id=basic-usage |
| オブジェクト | https://zod.dev/?id=objects |
| バリデーション | https://zod.dev/?id=strings |

## 使用上の注意

- fetch MCP は URL の内容をそのまま取得するため、**ページが重い場合はレスポンスが遅くなる**
- 取得結果が長すぎる場合は `max_length` パラメータで制限可能
- 社内ドキュメントやログイン必須ページは取得不可
