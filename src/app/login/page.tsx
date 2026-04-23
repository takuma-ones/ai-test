import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Footer } from "@/components/layout/footer";
import { FlaskConical } from "lucide-react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/forms");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center border-b px-6">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <FlaskConical className="h-3.5 w-3.5" />
          </div>
          <span className="text-[15px]">AI Test Lab</span>
        </div>
        <div className="flex-1" />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}
