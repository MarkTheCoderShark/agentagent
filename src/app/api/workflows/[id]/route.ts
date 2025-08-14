import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { enqueueTaskExecute } from "@/lib/queue";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const { name, description, status, schedule } = await request.json();
  const wf = await prisma.workflow.findUnique({ where: { id } });
  if (!wf || wf.userId !== session.user.id) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const updated = await prisma.workflow.update({ where: { id }, data: { name, description, status, schedule } });
  return NextResponse.json(updated);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const action = new URL(request.url).searchParams.get("action");
  if (action !== "run") return NextResponse.json({ message: "Unsupported action" }, { status: 400 });
  const wf = await prisma.workflow.findUnique({ where: { id } });
  if (!wf || wf.userId !== session.user.id) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const task = await prisma.task.create({
    data: {
      title: `Workflow ${wf.name} run`,
      description: `Manual run of workflow ${wf.name}`,
      type: "automation",
      status: "pending",
      userId: wf.userId,
      agentId: wf.agentId,
      workflowId: wf.id,
      input: { workflow: true, actions: wf.actions },
    },
  });

  const enqueued = await enqueueTaskExecute({ taskId: task.id, userId: wf.userId });
  if (enqueued) {
    await prisma.task.update({ where: { id: task.id }, data: { status: "in_progress", startedAt: new Date() } });
  }
  return NextResponse.json({ id: task.id, enqueued });
} 