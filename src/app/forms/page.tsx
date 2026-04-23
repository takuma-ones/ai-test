"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FormsSidebar } from "@/components/forms/forms-sidebar";
import { TextInputCard } from "@/components/forms/text-input-card";
import { SelectCard } from "@/components/forms/select-card";
import { DatePickerCard } from "@/components/forms/date-picker-card";
import { CheckboxCard } from "@/components/forms/checkbox-card";
import { ConditionalCard } from "@/components/forms/conditional-card";
import type { Role } from "@/types";

export default function FormsPage() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("text");
  const mainRef = useRef<HTMLDivElement>(null);

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as Role,
      }
    : undefined;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = mainRef.current?.querySelector(`#sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} currentPath="/forms" />
      <div className="flex flex-1 min-h-0">
        <FormsSidebar activeSection={activeSection} onSelect={scrollTo} />
        <main
          ref={mainRef}
          className="flex-1 overflow-auto"
        >
          <div className="max-w-[980px] mx-auto px-8 py-6">
            <div className="mb-5">
              <h1 className="text-[22px] font-semibold tracking-tight">検証用フォーム</h1>
              <p className="text-[13px] text-muted-foreground mt-1">
                各コンポーネントを個別独立で検証できます。下部の送信ボタンでバリデーションを確認してください。
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <TextInputCard />
              <SelectCard />
              <DatePickerCard />
              <CheckboxCard />
              <ConditionalCard />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
