import { describe, it, expect } from "vitest";
import { checkboxInputSchema } from "./checkbox-input";

describe("checkboxInputSchema", () => {
  describe("有効な入力", () => {
    it("1つ以上のアイテム選択で受け付ける", () => {
      // Arrange
      const input = { items: ["unit"], notification: true, frequency: "daily" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("全アイテム選択も受け付ける", () => {
      // Arrange
      const input = { items: ["unit", "e2e", "api"], notification: false, frequency: "weekly" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("通知オフでも受け付ける", () => {
      // Arrange
      const input = { items: ["e2e"], notification: false, frequency: "manual" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("無効な入力", () => {
    it("空配列のアイテムはエラー", () => {
      // Arrange
      const input = { items: [], notification: true, frequency: "daily" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("少なくとも1つ選択してください");
      }
    });

    it("enum外の頻度はエラー", () => {
      // Arrange
      const input = { items: ["unit"], notification: true, frequency: "monthly" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("アイテムなしはエラー", () => {
      // Arrange
      const input = { notification: true, frequency: "daily" };
      // Act
      const result = checkboxInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });
});
