import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ success: false, message: "認証が必要です" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "権限がありません" }, { status: 403 });
  }

  const [totalUsers, totalSubmissions] = await Promise.all([
    prisma.user.count(),
    prisma.formSubmission.count(),
  ]);

  return NextResponse.json({
    success: true,
    totalUsers,
    activeSessions: 38,
    testRuns: totalSubmissions,
    errorRate: "2.4%",
  });
}
