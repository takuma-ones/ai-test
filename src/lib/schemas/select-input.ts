import { z } from "zod";

export const categoryEnum = z.enum(["frontend", "backend", "fullstack", "infra"], {
  errorMap: () => ({ message: "カテゴリを選択してください" }),
});

export const productEnum = z.enum(
  ["productA", "productB", "productC", "productD", "productE"],
  { errorMap: () => ({ message: "製品を選択してください" }) }
);

export const selectInputSchema = z.object({
  category: categoryEnum,
  product: productEnum,
});

export type SelectInput = z.infer<typeof selectInputSchema>;
