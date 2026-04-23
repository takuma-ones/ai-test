"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { RoleBadge } from "@/components/layout/role-badge";
import type { Role } from "@/types";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

interface UsersTableProps {
  users?: UserRow[];
  loading?: boolean;
}

export function UsersTable({ users = [], loading }: UsersTableProps) {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.includes(query) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h3 className="text-base font-semibold">ユーザー一覧</h3>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            登録済みユーザーとロール、登録日
          </p>
        </div>
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="名前・メールで検索"
            className="h-8 w-full rounded-md border border-input bg-transparent pl-8 pr-3 text-[13px] outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">名前</TableHead>
            <TableHead>メール</TableHead>
            <TableHead className="w-24">ロール</TableHead>
            <TableHead className="w-36">登録日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                </TableRow>
              ))
            : filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="pl-6 font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <RoleBadge role={u.role} />
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-[12px]">
                    {new Date(u.createdAt).toLocaleDateString("ja-JP")}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
