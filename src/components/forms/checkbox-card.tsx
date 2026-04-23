"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkboxInputSchema, type CheckboxInput } from "@/lib/schemas/checkbox-input";

const TEST_ITEMS = [
  { id: "unit" as const, label: "ユニットテスト" },
  { id: "e2e" as const, label: "E2Eテスト" },
  { id: "api" as const, label: "API結合テスト" },
];

export function CheckboxCard() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<CheckboxInput>({
    resolver: zodResolver(checkboxInputSchema),
    defaultValues: {
      items: ["unit"],
      notification: true,
      frequency: "weekly",
    },
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: CheckboxInput) {
    const res = await fetch("/api/validate/checkbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  return (
    <Card id="sec-check">
      <CardHeader>
        <CardTitle className="text-base">チェック・スイッチ</CardTitle>
        <CardDescription>複数選択 / トグル / 単一選択</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      実施するテスト <span className="text-destructive">*</span>
                    </FormLabel>
                    {TEST_ITEMS.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2.5 py-1.5 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const current = field.value ?? [];
                                  field.onChange(
                                    checked
                                      ? [...current, item.id]
                                      : current.filter((v) => v !== item.id)
                                  );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>通知</FormLabel>
                    <FormItem className="flex items-center gap-2.5 py-1.5 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        失敗時にSlack通知
                      </FormLabel>
                    </FormItem>
                    <FormDescription>
                      現在: {field.value ? "有効" : "無効"}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>実行頻度</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col"
                      >
                        {[
                          { value: "daily", label: "毎日" },
                          { value: "weekly", label: "毎週" },
                          { value: "manual", label: "手動のみ" },
                        ].map((opt) => (
                          <FormItem
                            key={opt.value}
                            className="flex items-center gap-2.5 py-1.5 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={opt.value} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {opt.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
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
