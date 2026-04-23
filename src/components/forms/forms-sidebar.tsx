"use client";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "text", label: "テキスト入力" },
  { id: "select", label: "セレクト・コンボボックス" },
  { id: "date", label: "日付選択" },
  { id: "check", label: "チェック・スイッチ" },
  { id: "conditional", label: "条件付きバリデーション" },
];

interface FormsSidebarProps {
  activeSection: string;
  onSelect: (id: string) => void;
}

export function FormsSidebar({ activeSection, onSelect }: FormsSidebarProps) {
  return (
    <aside className="w-60 shrink-0 border-r bg-muted/40 flex flex-col gap-0.5 p-3 overflow-y-auto">
      <p className="px-3 py-2 text-[11px] uppercase tracking-widest font-medium text-muted-foreground">
        入力タイプ
      </p>
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium text-left w-full transition-colors ${
            activeSection === s.id
              ? "bg-accent text-primary"
              : "text-foreground hover:bg-accent"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
              activeSection === s.id ? "bg-primary" : "bg-muted-foreground"
            }`}
          />
          {s.label}
        </button>
      ))}
      <div className="flex-1" />
      <div className="border-t mt-4 pt-3 px-3 pb-1 text-[11px] text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground mb-1">テスト検証モード</p>
        shadcn/ui の網羅的なフォーム要素を個別に検証します
      </div>
    </aside>
  );
}
