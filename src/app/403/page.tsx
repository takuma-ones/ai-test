import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Error403 } from "@/components/error/error-403";
import type { Role } from "@/types";

export default async function ForbiddenPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as Role,
      }
    : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">
        <Error403 />
      </main>
      <Footer />
    </div>
  );
}
