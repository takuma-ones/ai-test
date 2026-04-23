import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Beaker, Gauge, Users } from "lucide-react";

interface KPIData {
  totalUsers: number;
  activeSessions: number;
  testRuns: number;
  errorRate: string;
}

interface KPICardsProps {
  data?: KPIData;
  loading?: boolean;
}

function KPICard({
  label,
  value,
  delta,
  deltaDir,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  delta: string;
  deltaDir: "up" | "down";
  icon: React.ElementType;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-4 flex flex-col gap-1.5">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-2.5 w-12 mt-1" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[12px] text-muted-foreground font-medium">
        {label}
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-[28px] font-semibold tracking-tight tabular-nums">{value}</div>
      <div
        className={`text-[11px] flex items-center gap-0.5 ${
          deltaDir === "up"
            ? "text-[hsl(var(--success))]"
            : "text-destructive"
        }`}
      >
        {deltaDir === "up" ? "▲" : "▼"} {delta}
      </div>
    </div>
  );
}

export function KPICards({ data, loading }: KPICardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <KPICard
        label="総ユーザー数"
        value={data ? String(data.totalUsers) : "247"}
        delta="+12 (今週)"
        deltaDir="up"
        icon={Users}
        loading={loading}
      />
      <KPICard
        label="アクティブセッション"
        value={data ? String(data.activeSessions) : "38"}
        delta="+4"
        deltaDir="up"
        icon={Activity}
        loading={loading}
      />
      <KPICard
        label="テスト実行回数"
        value={data ? String(data.testRuns) : "1,284"}
        delta="+156 (24h)"
        deltaDir="up"
        icon={Beaker}
        loading={loading}
      />
      <KPICard
        label="エラー率"
        value={data ? data.errorRate : "2.4%"}
        delta="-0.8%"
        deltaDir="up"
        icon={Gauge}
        loading={loading}
      />
    </div>
  );
}
