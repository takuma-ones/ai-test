import { cn } from "@/lib/utils";
import type { Role } from "@/types";

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        role === "ADMIN" ? "badge-admin" : "badge-user",
        className
      )}
    >
      {role === "ADMIN" ? "Admin" : "User"}
    </span>
  );
}
