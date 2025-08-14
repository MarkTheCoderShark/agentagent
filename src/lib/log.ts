import { prisma } from "@/lib/prisma";

export async function logEvent(userId: string, type: string, payload: any) {
  try {
    await prisma.event.create({ data: { userId, type, payload } });
  } catch (_err) {
    // swallow
  }
} 