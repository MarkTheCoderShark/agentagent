import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const tasks = await prisma.task.findMany({
			where: { userId: session.user.id },
			orderBy: { createdAt: "desc" },
			take: 25,
		});
		return NextResponse.json(tasks);
	} catch (_err) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const body = await request.json();
		const { title, type = "content", description, agentId, workflowId, status = "pending", input } = body || {};
		if (!title) {
			return NextResponse.json({ message: "Title is required" }, { status: 400 });
		}
		const task = await prisma.task.create({
			data: {
				title,
				description,
				type,
				status,
				input,
				userId: session.user.id,
				agentId: agentId || null,
				workflowId: workflowId || null,
				startedAt: null,
				completedAt: null,
			},
		});
		return NextResponse.json(task, { status: 201 });
	} catch (_err) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
} 