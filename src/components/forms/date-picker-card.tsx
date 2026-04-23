"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
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
import { cn } from "@/lib/utils";
import { dateInputSchema, type DateInput } from "@/lib/schemas/date-input";

export function DatePickerCard() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DateInput>({
    resolver: zodResolver(dateInputSchema),
    mode: "onTouched",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: DateInput) {
    const res = await fetch("/api/validate/date", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: values.date.toISOString() }),
    });
    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      form.reset();
    }
  }

  return (
    <Card id="sec-date">
      <CardHeader>
        <CardTitle className="text-base">日付選択</CardTitle>
        <CardDescription>カレンダーポップオーバー</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      検証実施日 <span className="text-destructive">*</span>
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "yyyy/MM/dd", { locale: ja })
                            : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
