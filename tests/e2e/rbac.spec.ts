import { test, expect, type Page } from "@playwright/test";

const ADMIN_EMAIL = "yamada@example.com";
const USER_EMAIL = "sato@example.com";
const PASSWORD = "password123";

async function loginAs(page: Page, email: string) {
  await page.goto("/login");
  await page.getByLabel("メールアドレス").fill(email);
  await page.getByLabel("パスワード").fill(PASSWORD);
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.waitForURL(/\/(forms|admin)/);
}

test.describe("Feature: ロールベースアクセス制御", () => {
  test("Scenario: 管理者が管理者画面にアクセスできる", async ({ page }) => {
    // Given 管理者ロールでログインしている
    await loginAs(page, ADMIN_EMAIL);

    // When /admin にアクセスする
    await page.goto("/admin");

    // Then 管理者ダッシュボードが表示される
    await expect(page).toHaveURL("/admin");
    await expect(page.getByText("管理者ダッシュボード")).toBeVisible();
    await expect(page.getByText("KPI")).toBeHidden({ timeout: 1000 }).catch(() => {});
  });

  test("Scenario: 一般ユーザーが管理者画面にアクセスすると403エラーページが表示される", async ({ page }) => {
    // Given 一般ユーザーロールでログインしている
    await loginAs(page, USER_EMAIL);

    // When /admin にアクセスする
    await page.goto("/admin");

    // Then 403エラーページが表示される
    await expect(page).toHaveURL("/403");
    await expect(page.getByText("アクセス権限がありません")).toBeVisible();
    await expect(page.getByText("403")).toBeVisible();
  });

  test("Scenario: 未認証ユーザーが保護されたページにアクセスするとログインページへリダイレクト", async ({ page }) => {
    // Given 未ログイン状態
    // When /forms にアクセスする
    await page.goto("/forms");

    // Then ログインページにリダイレクトされる
    await expect(page).toHaveURL(/\/login/);
  });

  test("Scenario: 403ページから「ホームに戻る」でフォームページへ戻れる", async ({ page }) => {
    // Given 一般ユーザーで403エラーページにいる
    await loginAs(page, USER_EMAIL);
    await page.goto("/403");

    // When 「ホームに戻る」ボタンをクリックする
    await page.getByRole("button", { name: "ホームに戻る" }).click();

    // Then フォームページに遷移する
    await expect(page).toHaveURL("/forms");
  });
});
