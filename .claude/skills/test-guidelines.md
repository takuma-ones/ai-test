---
name: test-guidelines
---

# テストガイドライン

Claude Code および sub-agent がテストコードを生成・修正する際に遵守すべきルール。

## 基本原則

1. **テスト駆動開発(AI-TDD)を徹底**し、失敗するテストを先に書くこと。
2. **AAAパターン**（Arrange, Act, Assert）を守ること。
3. **Zodのスキーマ検証はエッジケースを含める**こと。

## テストファイル命名規約

| テストレベル | ファイルパターン | 配置ディレクトリ |
|---|---|---|
| ユニットテスト | `*.test.ts` | テスト対象と同階層 |
| E2Eテスト | `*.spec.ts` | `tests/e2e/` |

## AAAパターンの記述例

```typescript
describe("validateEmail", () => {
  it("有効なメールアドレスを受け入れる", () => {
    // Arrange: テストデータの準備
    const validEmail = "test@example.com";

    // Act: テスト対象の関数を実行
    const result = emailSchema.safeParse(validEmail);

    // Assert: 期待する結果を検証
    expect(result.success).toBe(true);
  });
});
```

## Zodスキーマテストで必須のエッジケース

- 空文字列 `""`
- `null` / `undefined`
- 境界値（最小値、最大値、最小値-1、最大値+1）
- 型の不一致（数値フィールドに文字列など）
- 特殊文字・SQLインジェクション的な入力
- 最大長を超える文字列

## BDD シナリオとの対応

テストコード作成時は、必ず `docs/spec/SPEC.md` の BDD シナリオ（Given/When/Then）と1:1で対応させること。シナリオの勝手な削除・省略は禁止。
