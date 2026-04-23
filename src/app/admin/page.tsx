import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { KPICards } from "@/components/admin/kpi-cards";
import { UsersTable } from "@/components/admin/users-table";
import type { Role } from "@/types";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/403");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as Role,
    createdAt: u.createdAt.toISOString(),
  }));

  const user = {
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as Role,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} currentPath="/admin" />
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1120px] mx-auto px-8 py-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-admin inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium">
                  Admin
                </span>
                <span className="text-[12px] text-muted-foreground">/admin</span>
              </div>
              <h1 className="text-[22px] font-semibold tracking-tight">管理者ダッシュボード</h1>
              <p className="text-[13px] text-muted-foreground mt-1">
                {new Date().toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <KPICards data={{ totalUsers: users.length, activeSessions: 38, testRuns: 1284, errorRate: "2.4%" }} />
          <UsersTable users={formattedUsers} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
