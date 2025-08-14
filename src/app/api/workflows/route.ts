import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const items = await prisma.workflow.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { name, description, type = "manual", triggers = [], actions = [], conditions = null, schedule = null, agentId = null } = await request.json();
  if (!name) return NextResponse.json({ message: "Name required" }, { status: 400 });
  const created = await prisma.workflow.create({
    data: { name, description, type, triggers, actions, conditions, schedule, userId: session.user.id, agentId },
  });
  return NextResponse.json(created, { status: 201 });
} 