"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { conditionalSchema, type ConditionalInput } from "@/lib/schemas/conditional";

export function ConditionalCard() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ConditionalInput>({
    resolver: zodResolver(conditionalSchema),
    defaultValues: { category: undefined, details: "" },
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;
  const category = form.watch("category");
  const isOther = category === "other";

  async function onSubmit(values: ConditionalInput) {
    const res = await fetch("/api/validate/conditional", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      form.reset();
    }
  }

  return (
    <Card id="sec-conditional">
      <CardHeader>
        <CardTitle className="text-base">条件付きバリデーション</CardTitle>
        <CardDescription>
          「その他」を選択すると詳細説明が必須に変わります
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    カテゴリ <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="categoryA">カテゴリA</SelectItem>
                      <SelectItem value="categoryB">カテゴリB</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    詳細説明
                    {isOther && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        isOther
                          ? "その他の理由を入力してください"
                          : "補足があればご記入ください"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {isOther
                      ? "「その他」を選択したため必須です"
                      : "任意入力"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            {submitted && (
              <span className="flex items-center gap-1.5 text-sm text-[hsl(var(--success))]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                送信に成功しました
              </span>
            )}
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              {isSubmitting ? "送信中..." : "送信"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
