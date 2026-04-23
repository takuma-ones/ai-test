"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Error403() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full py-20 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-5">
        <ShieldAlert className="h-7 w-7" strokeWidth={2} />
      </div>
      <div className="text-[52px] font-bold tracking-tighter leading-none mb-2 tabular-nums">
        403
      </div>
      <h1 className="text-xl font-semibold mb-2">アクセス権限がありません</h1>
      <p className="text-[14px] text-muted-foreground mb-6 max-w-sm">
        このページは管理者のみアクセス可能です。
        <br />
        権限が必要な場合は管理者にお問い合わせください。
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.push("/user")}>
          プロファイルへ
        </Button>
        <Button onClick={() => router.push("/forms")}>ホームに戻る</Button>
      </div>
    </div>
  );
}
