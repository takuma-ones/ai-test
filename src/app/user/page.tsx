import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileCard } from "@/components/user/profile-card";
import type { Role } from "@/types";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { _count: { select: { submissions: true } } },
  });

  if (!dbUser) redirect("/login");

  const user = {
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as Role,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} currentPath="/user" />
      <main className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-[560px] px-8 py-8">
          <div className="mb-4">
            <p className="text-[12px] text-muted-foreground">/user</p>
            <h1 className="text-[22px] font-semibold tracking-tight mt-1">プロファイル</h1>
          </div>
          <ProfileCard
            name={dbUser.name}
            email={dbUser.email}
            role={dbUser.role as Role}
            registeredAt={dbUser.createdAt.toISOString()}
            submissionCount={dbUser._count.submissions}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
