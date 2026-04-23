import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dateInputSchema } from "@/lib/schemas/date-input";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, errors: [{ field: "auth", message: "認証が必要です" }] }, { status: 401 });
  }

  const body: unknown = await req.json();
  const parsed = dateInputSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
