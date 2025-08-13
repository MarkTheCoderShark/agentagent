import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/llm";

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
			include: { agent: { select: { name: true } } },
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
		// Create the task
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
			include: { agent: { select: { name: true } } },
		});

		// If demo task, immediately execute via LLM and complete
		if (type === "demo") {
			const system = `You are an AI Agent Employee that writes helpful, concise outputs.`;
			const user = description || "Introduce yourself and summarize how you can help.";
			const content = await generateText(system, user);
			const completed = await prisma.task.update({
				where: { id: task.id },
				data: {
					status: "completed",
					output: { text: content },
					startedAt: new Date(),
					completedAt: new Date(),
				},
				include: { agent: { select: { name: true } } },
			});
			return NextResponse.json(completed, { status: 201 });
		}

		return NextResponse.json(task, { status: 201 });
	} catch (_err) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
} 