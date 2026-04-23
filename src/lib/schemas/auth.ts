import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("メールアドレスの形式が正しくありません"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type LoginInput = z.infer<typeof loginSchema>;
