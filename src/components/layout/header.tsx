"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FlaskConical, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { RoleBadge } from "./role-badge";
import type { Role } from "@/types";

interface HeaderProps {
  user?: { name?: string | null; email?: string | null; role?: Role };
  currentPath?: string;
}

export function Header({ user, currentPath }: HeaderProps) {
  const router = useRouter();

  const navLinks = [
    { href: "/forms", label: "フォーム" },
    ...(user?.role === "ADMIN" ? [{ href: "/admin", label: "管理者" }] : []),
    { href: "/user", label: "プロファイル" },
  ];

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-6">
      <div className="flex items-center gap-2 font-semibold tracking-tight">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <FlaskConical className="h-3.5 w-3.5" />
        </div>
        <span className="text-[15px]">AI Test Lab</span>
      </div>

      {user && (
        <nav className="flex gap-0.5 ml-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                currentPath === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}

      <div className="flex-1" />
      <ThemeToggle />

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary">
                {initials}
              </div>
              <div className="text-left leading-tight">
                <div className="text-[13px] font-medium">{user.name}</div>
              </div>
              {user.role && <RoleBadge role={user.role} />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-3 py-1.5 text-xs text-muted-foreground">{user.email}</div>
            <DropdownMenuSeparator />
            {user.role === "ADMIN" && (
              <DropdownMenuItem onClick={() => router.push("/admin")}>
                <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                管理者ダッシュボード
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
