import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12);

  const users = [
    { name: "山田 太郎", email: "yamada@example.com", role: "ADMIN" as const },
    { name: "佐藤 花子", email: "sato@example.com", role: "USER" as const },
    { name: "田中 一郎", email: "tanaka@example.com", role: "USER" as const },
    { name: "鈴木 次郎", email: "suzuki@example.com", role: "ADMIN" as const },
    { name: "高橋 三郎", email: "takahashi@example.com", role: "USER" as const },
    { name: "伊藤 四郎", email: "ito@example.com", role: "USER" as const },
    { name: "渡辺 五郎", email: "watanabe@example.com", role: "USER" as const },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: hashedPassword },
    });
  }

  console.log("Seed completed. Users created:", users.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
