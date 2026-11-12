import { PrismaClient } from "@prisma/client";

// Single shared Prisma client.
// Instantiating PrismaClient per module (the previous pattern) leaks connections
// under Next.js dev hot-reload and multiplies clients across route files.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
