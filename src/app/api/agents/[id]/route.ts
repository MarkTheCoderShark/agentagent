import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, context: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const agentId = context?.params?.id as string | undefined;
    if (!agentId) {
      return NextResponse.json({ message: "Missing agent id" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      role,
      description,
      tone,
      permissions,
      workingHours,
      status,
      avatar,
    } = body || {};

    // Ensure the agent belongs to the current user
    const agent = await prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent || agent.userId !== session.user.id) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (typeof name === "string" && name.trim().length > 0) data.name = name.trim();
    if (typeof role === "string" && role.trim().length > 0) data.role = role.trim();
    if (typeof description === "string") data.description = description;
    if (typeof tone === "string" && tone.trim().length > 0) data.tone = tone.trim();
    if (permissions !== undefined) data.permissions = permissions;
    if (workingHours !== undefined) data.workingHours = workingHours;
    if (typeof status === "string" && status.trim().length > 0) data.status = status.trim();
    if (typeof avatar === "string" && avatar.trim().length > 0) data.avatar = avatar.trim();

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: "No updates provided" }, { status: 400 });
    }

    const updated = await prisma.agent.update({ where: { id: agentId }, data });
    return NextResponse.json(updated);
  } catch (_err) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}