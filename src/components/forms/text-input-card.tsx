"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { textInputSchema, type TextInput } from "@/lib/schemas/text-input";

export function TextInputCard() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<TextInput>({
    resolver: zodResolver(textInputSchema),
    defaultValues: { name: "", email: "", age: 0 },
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: TextInput) {
    const res = await fetch("/api/validate/text", {
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
    <Card id="sec-text">
      <CardHeader>
        <CardTitle className="text-base">テキスト入力</CardTitle>
        <CardDescription>文字列・メール・数値の基本バリデーション</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      名前 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="山田 太郎" {...field} />
                    </FormControl>
                    <FormDescription>1〜50文字</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      メールアドレス <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      年齢 <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormDescription>0〜150</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            {submitted && (
              <span className="flex items-center gap-1.5 text-sm text-[hsl(var(--success))]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                送信に成功しました
              </span>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
              {isSubmitting ? "送信中..." : "送信"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
