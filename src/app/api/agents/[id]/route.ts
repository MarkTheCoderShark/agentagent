import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();
    const { name, role, description, tone, permissions, workingHours } = body || {};

    const agent = await prisma.agent.findUnique({ where: { id } });
    if (!agent || agent.userId !== session.user.id) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const updated = await prisma.agent.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(role ? { role } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(tone ? { tone } : {}),
        ...(permissions !== undefined ? { permissions } : {}),
        ...(workingHours !== undefined ? { workingHours } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (_err) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 