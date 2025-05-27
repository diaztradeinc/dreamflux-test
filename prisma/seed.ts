import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "free@dreamflux.io",
        password,
        role: "FREE",
      },
      {
        email: "pro@dreamflux.io",
        password,
        role: "PRO",
      }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeded test users");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
