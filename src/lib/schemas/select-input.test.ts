import { describe, it, expect } from "vitest";
import { selectInputSchema } from "./select-input";

describe("selectInputSchema", () => {
  describe("有効な入力", () => {
    it("有効なカテゴリと製品を受け付ける", () => {
      // Arrange
      const input = { category: "frontend", product: "productA" };
      // Act
      const result = selectInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("すべてのカテゴリ値を受け付ける", () => {
      // Arrange
      const categories = ["frontend", "backend", "fullstack", "infra"];
      // Act & Assert
      for (const category of categories) {
        const result = selectInputSchema.safeParse({ category, product: "productA" });
        expect(result.success).toBe(true);
      }
    });

    it("すべての製品値を受け付ける", () => {
      // Arrange
      const products = ["productA", "productB", "productC", "productD", "productE"];
      // Act & Assert
      for (const product of products) {
        const result = selectInputSchema.safeParse({ category: "frontend", product });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("無効な入力", () => {
    it("enum外のカテゴリはエラー", () => {
      // Arrange
      const input = { category: "design", product: "productA" };
      // Act
      const result = selectInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("カテゴリを選択してください");
      }
    });

    it("enum外の製品はエラー", () => {
      // Arrange
      const input = { category: "frontend", product: "productZ" };
      // Act
      const result = selectInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("製品を選択してください");
      }
    });

    it("カテゴリなしはエラー", () => {
      // Arrange
      const input = { product: "productA" };
      // Act
      const result = selectInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("nullはエラー", () => {
      // Arrange
      const input = { category: null, product: null };
      // Act
      const result = selectInputSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });
});
