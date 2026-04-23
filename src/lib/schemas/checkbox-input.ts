import { z } from "zod";

export const frequencyEnum = z.enum(["daily", "weekly", "manual"], {
  errorMap: () => ({ message: "実行頻度を選択してください" }),
});

export const checkboxInputSchema = z.object({
  items: z
    .array(z.enum(["unit", "e2e", "api"]))
    .min(1, "少なくとも1つ選択してください"),
  notification: z.boolean(),
  frequency: frequencyEnum,
});

export type CheckboxInput = z.infer<typeof checkboxInputSchema>;
