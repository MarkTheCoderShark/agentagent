import { PrismaClient } from "@prisma/client";

// Force library engine and disable Data Proxy
process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";
process.env.PRISMA_FORCE_NAPI = "true";
process.env.PRISMA_GENERATE_DATAPROXY = "false";

declare global {
	var prismaGlobal: PrismaClient | undefined;
}

export const prisma = global.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma; 