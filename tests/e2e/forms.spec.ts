import { test, expect } from "@playwright/test";

const USER_EMAIL = "sato@example.com";
const PASSWORD = "password123";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("メールアドレス").fill(USER_EMAIL);
  await page.getByLabel("パスワード").fill(PASSWORD);
  await page.getByRole("button", { name: "ログイン" }).click();
  await page.waitForURL("/forms");
});

test.describe("Feature: フォーム要素の検証 (/forms)", () => {
  test("Scenario: フォームページが5つのカードで表示される", async ({ page }) => {
    // Given /forms にアクセスしている
    // Then 5種類のフォームカードが表示される
    await expect(page.getByText("テキスト入力")).toBeVisible();
    await expect(page.getByText("セレクト・コンボボックス")).toBeVisible();
    await expect(page.getByText("日付選択")).toBeVisible();
    await expect(page.getByText("チェック・スイッチ")).toBeVisible();
    await expect(page.getByText("条件付きバリデーション")).toBeVisible();
  });

  test("Scenario: テキスト入力の有効な値で送信成功", async ({ page }) => {
    // Given /forms の テキスト入力 セクションにいる
    // When 有効な値を入力して送信する
    await page.getByLabel("名前").first().fill("山田 太郎");
    await page.getByLabel("メールアドレス").first().fill("yamada@example.com");
    await page.getByLabel("年齢").fill("30");
    await page.locator("#sec-text").getByRole("button", { name: "送信" }).click();

    // Then 送信成功メッセージが表示される
    await expect(page.getByText("送信に成功しました").first()).toBeVisible({ timeout: 5000 });
  });

  test("Scenario: 必須フィールドが未入力の場合エラーが表示される", async ({ page }) => {
    // Given /forms のテキスト入力セクションにいる
    // When 必須フィールドを空のまま送信する（名前フィールドをタッチして離す）
    await page.getByLabel("名前").first().click();
    await page.getByLabel("メールアドレス").first().click();

    // Then エラーメッセージが表示される
    await expect(page.getByText("名前は必須です")).toBeVisible();
  });

  test("Scenario: 不正なメール形式でエラーが表示される", async ({ page }) => {
    // Given /forms のテキスト入力セクションにいる
    // When 不正なメール形式を入力する
    await page.getByLabel("メールアドレス").first().fill("not-an-email");
    await page.getByLabel("名前").first().click();

    // Then エラーメッセージが表示される
    await expect(page.getByText("メールアドレスの形式が正しくありません").first()).toBeVisible();
  });
});

test.describe("Feature: 条件付きバリデーション (/forms)", () => {
  test("Scenario: 「その他」を選択すると詳細説明が必須になる", async ({ page }) => {
    // Given /forms の条件付きバリデーションセクションにいる
    // When カテゴリで「その他」を選択する
    await page.locator("#sec-conditional").getByRole("combobox").click();
    await page.getByRole("option", { name: "その他" }).click();

    // Then 詳細説明フィールドが必須になり（*マークが表示される）
    await expect(page.getByText("「その他」を選択したため必須です")).toBeVisible();

    // And 空のまま送信するとエラーが表示される
    await page.locator("#sec-conditional").getByRole("button", { name: "送信" }).click();
    await expect(page.getByText("「その他」を選択した場合、詳細説明は必須です")).toBeVisible();
  });

  test("Scenario: 「カテゴリA」を選択した場合は詳細説明は任意", async ({ page }) => {
    // Given /forms の条件付きバリデーションセクションにいる
    // When カテゴリで「カテゴリA」を選択する
    await page.locator("#sec-conditional").getByRole("combobox").click();
    await page.getByRole("option", { name: "カテゴリA" }).click();

    // Then 詳細説明は任意のまま
    await expect(page.getByText("任意入力")).toBeVisible();
  });
});
