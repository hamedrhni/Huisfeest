import { PrismaClient } from "@prisma/client";

// Singleton pattern: reuse the client across HMR reloads in development
// and across requests in production (one Node.js process, one client).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
