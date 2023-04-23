import { PrismaClient } from "@prisma/client";

let prismaInit: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaInit = new PrismaClient();
} else {
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient();
  }
  prismaInit = (globalThis as any).prisma;
}

export const prisma = prismaInit;
