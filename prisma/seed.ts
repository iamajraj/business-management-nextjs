import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  prisma.$connect();
  const salt = await bcryptjs.genSalt(15);
  const hashedPassword = await bcryptjs.hash("raj123", salt);

  console.log(`Seeding in process 🔃`);

  const admin = await prisma.admin.create({
    data: {
      name: "Raj",
      email: "r@r.com",
      password: hashedPassword,
    },
  });

  console.log(admin);
}

seed()
  .then(() => {
    console.log(`Seeding successful ✅`);
  })
  .catch((err) => {
    console.log(`Error ❌: `, err);
  })
  .finally(() => {
    prisma.$disconnect();
  });
