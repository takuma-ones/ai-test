import { describe, it, expect } from "vitest";
import { conditionalSchema } from "./conditional";

describe("conditionalSchema", () => {
  describe("「その他」以外を選択した場合", () => {
    it("カテゴリAで詳細なしを受け付ける", () => {
      // Arrange
      const input = { category: "categoryA", details: "" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("カテゴリBで詳細なしを受け付ける", () => {
      // Arrange
      const input = { category: "categoryB" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("カテゴリAで詳細ありも受け付ける", () => {
      // Arrange
      const input = { category: "categoryA", details: "補足説明" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("「その他」を選択した場合", () => {
    it("「その他」で詳細あり（必須チェック通過）", () => {
      // Arrange
      const input = { category: "other", details: "その他の理由" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("「その他」で詳細なし（空文字）はエラー", () => {
      // Arrange
      const input = { category: "other", details: "" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("「その他」を選択した場合、詳細説明は必須です");
        expect(result.error.errors[0].path).toEqual(["details"]);
      }
    });

    it("「その他」で詳細undefined（空白のみ）はエラー", () => {
      // Arrange
      const input = { category: "other", details: "   " };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("「その他」で詳細フィールドなしはエラー", () => {
      // Arrange
      const input = { category: "other" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });

  describe("無効なカテゴリ", () => {
    it("enum外の値はエラー", () => {
      // Arrange
      const input = { category: "invalid" };
      // Act
      const result = conditionalSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });
});
