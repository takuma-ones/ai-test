import { describe, it, expect } from "vitest";
import { textInputSchema } from "./text-input";

describe("textInputSchema", () => {
  describe("有効な入力", () => {
    it("正常な名前・メール・年齢を受け付ける", () => {
      // Arrange
      const input = { name: "山田 太郎", email: "yamada@example.com", age: 30 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("年齢0（境界値）を受け付ける", () => {
      // Arrange
      const input = { name: "テスト", email: "test@example.com", age: 0 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("年齢150（境界値）を受け付ける", () => {
      // Arrange
      const input = { name: "テスト", email: "test@example.com", age: 150 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("文字列の年齢を数値に変換する", () => {
      // Arrange
      const input = { name: "テスト", email: "test@example.com", age: "25" };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.age).toBe(25);
      }
    });
  });

  describe("無効な入力", () => {
    it("空の名前はエラー", () => {
      // Arrange
      const input = { name: "", email: "test@example.com", age: 25 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("名前は必須です");
      }
    });

    it("51文字の名前はエラー", () => {
      // Arrange
      const input = { name: "あ".repeat(51), email: "test@example.com", age: 25 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("名前は50文字以内で入力してください");
      }
    });

    it("不正なメール形式はエラー", () => {
      // Arrange
      const input = { name: "テスト", email: "not-an-email", age: 25 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("年齢-1はエラー", () => {
      // Arrange
      const input = { name: "テスト", email: "test@example.com", age: -1 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("年齢は0以上の数値を入力してください");
      }
    });

    it("年齢151はエラー", () => {
      // Arrange
      const input = { name: "テスト", email: "test@example.com", age: 151 };
      // Act
      const result = textInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("年齢は150以下で入力してください");
      }
    });
  });
});
