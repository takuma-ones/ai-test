import { describe, it, expect } from "vitest";
import { dateInputSchema } from "./date-input";

describe("dateInputSchema", () => {
  describe("有効な入力", () => {
    it("有効なDateオブジェクトを受け付ける", () => {
      // Arrange
      const input = { date: new Date("2026-04-23") };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("ISO文字列を日付に変換する", () => {
      // Arrange
      const input = { date: "2026-04-23T00:00:00.000Z" };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.date).toBeInstanceOf(Date);
      }
    });

    it("過去日付を受け付ける", () => {
      // Arrange
      const input = { date: new Date("2000-01-01") };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("未来日付を受け付ける", () => {
      // Arrange
      const input = { date: new Date("2030-12-31") };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("無効な入力", () => {
    it("undefinedはエラー", () => {
      // Arrange
      const input = { date: undefined };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("不正な文字列はエラー", () => {
      // Arrange
      const input = { date: "not-a-date" };
      // Act
      const result = dateInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });
});
