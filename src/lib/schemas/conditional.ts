import { z } from "zod";

export const conditionalSchema = z
  .object({
    category: z.enum(["categoryA", "categoryB", "other"], {
      errorMap: () => ({ message: "カテゴリを選択してください" }),
    }),
    details: z.string().optional(),
  })
  .refine(
    (data) =>
      data.category !== "other" ||
      (data.details !== undefined && data.details.trim().length > 0),
    {
      message: "「その他」を選択した場合、詳細説明は必須です",
      path: ["details"],
    }
  );

export type ConditionalInput = z.infer<typeof conditionalSchema>;
