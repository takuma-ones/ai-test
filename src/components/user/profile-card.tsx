import { RoleBadge } from "@/components/layout/role-badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import type { Role } from "@/types";

interface ProfileCardProps {
  name: string;
  email: string;
  role: Role;
  registeredAt: string;
  submissionCount: number;
}

export function ProfileCard({
  name,
  email,
  role,
  registeredAt,
  submissionCount,
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-[22px] font-semibold text-primary shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold">{name}</h2>
            <RoleBadge role={role} />
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {email}
          </div>
        </div>
        <Button variant="outline" size="sm">
          プロファイル編集
        </Button>
      </div>
      <div className="mt-6 pt-5 border-t grid grid-cols-3 gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
            登録日
          </p>
          <p className="text-sm font-medium">
            {new Date(registeredAt).toLocaleDateString("ja-JP")}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
            送信フォーム
          </p>
          <p className="text-sm font-medium tabular-nums">{submissionCount} 件</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
            ロール
          </p>
          <p className="text-sm font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}
