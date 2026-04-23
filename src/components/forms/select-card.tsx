"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { selectInputSchema, type SelectInput } from "@/lib/schemas/select-input";

const PRODUCTS = [
  { value: "productA", label: "製品A（Webアプリ）" },
  { value: "productB", label: "製品B（モバイルアプリ）" },
  { value: "productC", label: "製品C（デスクトップ）" },
  { value: "productD", label: "製品D（組み込み）" },
  { value: "productE", label: "製品E（API）" },
];

export function SelectCard() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SelectInput>({
    resolver: zodResolver(selectInputSchema),
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SelectInput) {
    const res = await fetch("/api/validate/select", {
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
    <Card id="sec-select">
      <CardHeader>
        <CardTitle className="text-base">セレクト・コンボボックス</CardTitle>
        <CardDescription>単一選択 / 検索付き選択</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="frontend">フロントエンド</SelectItem>
                        <SelectItem value="backend">バックエンド</SelectItem>
                        <SelectItem value="fullstack">フルスタック</SelectItem>
                        <SelectItem value="infra">インフラ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      製品 <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? PRODUCTS.find((p) => p.value === field.value)?.label
                              : "検索で絞り込み"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[220px]">
                        <Command>
                          <CommandInput placeholder="製品を検索..." />
                          <CommandList>
                            <CommandEmpty>見つかりません</CommandEmpty>
                            <CommandGroup>
                              {PRODUCTS.map((p) => (
                                <CommandItem
                                  key={p.value}
                                  value={p.value}
                                  onSelect={(val) => {
                                    field.onChange(val);
                                    setOpen(false);
                                  }}
                                >
                                  {p.label}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === p.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>検索で絞り込み</FormDescription>
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
