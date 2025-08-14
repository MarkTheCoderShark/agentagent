import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAgentLimitForTier, getCurrentMonthRange, getTaskMonthlyLimitForTier } from "@/lib/utils";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { subscriptionTier: true } });
    const subscriptionTier = user?.subscriptionTier || "free";

    const agentCount = await prisma.agent.count({ where: { userId: session.user.id } });
    const agentLimit = getAgentLimitForTier(subscriptionTier);

    const { start, end } = getCurrentMonthRange();
    const taskCountMonth = await prisma.task.count({ where: { userId: session.user.id, createdAt: { gte: start, lt: end } } });
    const taskLimitMonth = getTaskMonthlyLimitForTier(subscriptionTier);

    return NextResponse.json({ subscriptionTier, agentCount, agentLimit, taskCountMonth, taskLimitMonth });
  } catch (_err) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}