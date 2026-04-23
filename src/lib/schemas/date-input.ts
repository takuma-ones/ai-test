import { z } from "zod";

export const dateInputSchema = z.object({
  date: z.coerce.date({
    required_error: "日付を選択してください",
    invalid_type_error: "有効な日付を選択してください",
  }),
});

export type DateInput = z.infer<typeof dateInputSchema>;
