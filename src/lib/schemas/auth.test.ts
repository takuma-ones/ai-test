import { describe, it, expect } from "vitest";
import { loginSchema } from "./auth";

describe("loginSchema", () => {
  describe("有効な入力", () => {
    it("正しいメールとパスワードを受け付ける", () => {
      // Arrange
      const input = { email: "user@example.com", password: "password123" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });

    it("8文字丁度のパスワードを受け付ける", () => {
      // Arrange
      const input = { email: "user@example.com", password: "12345678" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(true);
    });
  });

  describe("無効な入力", () => {
    it("メール形式が不正の場合はエラー", () => {
      // Arrange
      const input = { email: "invalid-email", password: "password123" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("メールアドレスの形式が正しくありません");
      }
    });

    it("空のメールアドレスはエラー", () => {
      // Arrange
      const input = { email: "", password: "password123" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("7文字以下のパスワードはエラー", () => {
      // Arrange
      const input = { email: "user@example.com", password: "1234567" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("パスワードは8文字以上で入力してください");
      }
    });

    it("空のパスワードはエラー", () => {
      // Arrange
      const input = { email: "user@example.com", password: "" };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });

    it("nullはエラー", () => {
      // Arrange
      const input = { email: null, password: null };
      // Act
      const result = loginSchema.safeParse(input);
      // Assert
      expect(result.success).toBe(false);
    });
  });
});
