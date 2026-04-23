import { z } from "zod";

export const textInputSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  age: z.coerce
    .number({ invalid_type_error: "年齢は数値で入力してください" })
    .int("年齢は整数で入力してください")
    .min(0, "年齢は0以上の数値を入力してください")
    .max(150, "年齢は150以下で入力してください"),
});

export type TextInput = z.infer<typeof textInputSchema>;
