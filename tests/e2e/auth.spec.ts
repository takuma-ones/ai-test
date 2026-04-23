import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "yamada@example.com";
const USER_EMAIL = "sato@example.com";
const PASSWORD = "password123";
const INVALID_PASSWORD = "wrong123";

test.describe("Feature: 認証", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("Scenario: ログイン画面が表示される", async ({ page }) => {
    // Given ログインページにいる
    // Then ログインフォームが表示される
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    await expect(page.getByLabel("メールアドレス")).toBeVisible();
    await expect(page.getByLabel("パスワード")).toBeVisible();
    await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible();
  });

  test("Scenario: 管理者が正しい認証情報でログインすると管理者画面へ遷移", async ({ page }) => {
    // Given ログインページにいる
    // When 管理者の正しいメールとパスワードを入力して送信する
    await page.getByLabel("メールアドレス").fill(ADMIN_EMAIL);
    await page.getByLabel("パスワード").fill(PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();

    // Then 管理者ダッシュボードに遷移する
    await expect(page).toHaveURL("/admin");
    await expect(page.getByText("管理者ダッシュボード")).toBeVisible();
  });

  test("Scenario: 一般ユーザーが正しい認証情報でログインするとフォーム画面へ遷移", async ({ page }) => {
    // Given ログインページにいる
    // When ユーザーの正しいメールとパスワードを入力して送信する
    await page.getByLabel("メールアドレス").fill(USER_EMAIL);
    await page.getByLabel("パスワード").fill(PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();

    // Then フォーム画面に遷移する
    await expect(page).toHaveURL("/forms");
    await expect(page.getByText("検証用フォーム")).toBeVisible();
  });

  test("Scenario: 誤ったパスワードでログインに失敗する", async ({ page }) => {
    // Given ログインページにいる
    // When 正しいメールアドレスと誤ったパスワードを入力して送信する
    await page.getByLabel("メールアドレス").fill(USER_EMAIL);
    await page.getByLabel("パスワード").fill(INVALID_PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();

    // Then エラーメッセージが表示され、ログインページに留まる
    await expect(page.getByText("メールアドレスまたはパスワードが正しくありません")).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("Scenario: メール形式不正でバリデーションエラーが表示される", async ({ page }) => {
    // Given ログインページにいる
    // When 不正なメール形式を入力してフォーカスを外す
    await page.getByLabel("メールアドレス").fill("invalid-email");
    await page.getByLabel("パスワード").click();

    // Then メールアドレスのバリデーションエラーが表示される
    await expect(page.getByText("メールアドレスの形式が正しくありません")).toBeVisible();
  });

  test("Scenario: 7文字以下のパスワードでバリデーションエラー", async ({ page }) => {
    // Given ログインページにいる
    // When 7文字以下のパスワードを入力してフォーカスを外す
    await page.getByLabel("パスワード").fill("1234567");
    await page.getByLabel("メールアドレス").click();

    // Then パスワードのバリデーションエラーが表示される
    await expect(page.getByText("パスワードは8文字以上で入力してください")).toBeVisible();
  });
});
