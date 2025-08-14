import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/llm";
import { getMonthlyTaskLimitPerAgentForTier, getMonthRange } from "@/lib/utils";
import { enqueueTaskExecute } from "@/lib/queue";

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
			include: { agent: { select: { name: true, role: true } } },
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
		const { title, type = "content", description, agentId, workflowId, status = "pending", input, execute } = body || {};
		if (!title) {
			return NextResponse.json({ message: "Title is required" }, { status: 400 });
		}

		// Entitlement: monthly task cap per agent
		const user = await prisma.user.findUnique({ where: { id: session.user.id } });
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}
		if (agentId) {
			const { start, end } = getMonthRange();
			const monthlyLimit = getMonthlyTaskLimitPerAgentForTier(user.subscriptionTier as any);
			const count = await prisma.task.count({
				where: {
					userId: session.user.id,
					agentId,
					createdAt: { gte: start, lt: end },
				},
			});
			if (count >= monthlyLimit) {
				return NextResponse.json({ message: "Monthly task limit reached for this agent" }, { status: 403 });
			}
		}

		// Create the task base
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
			include: { agent: { select: { name: true, role: true } } },
		});

		// Demo path (immediate complete)
		if (type === "demo") {
			const system = `You are an AI Agent Employee that writes helpful, concise outputs.`;
			const userPrompt = description || "Introduce yourself and summarize how you can help.";
			const content = await generateText(system, userPrompt);
			const completed = await prisma.task.update({
				where: { id: task.id },
				data: {
					status: "completed",
					output: { text: content },
					startedAt: new Date(),
					completedAt: new Date(),
				},
				include: { agent: { select: { name: true, role: true } } },
			});
			return NextResponse.json(completed, { status: 201 });
		}

		// Non-demo execute → enqueue and mark in_progress
		if (execute) {
			const enqueued = await enqueueTaskExecute({ taskId: task.id, userId: session.user.id });
			if (enqueued) {
				const updated = await prisma.task.update({
					where: { id: task.id },
					data: {
						status: "in_progress",
						startedAt: new Date(),
					},
					include: { agent: { select: { name: true, role: true } } },
				});
				return NextResponse.json(updated, { status: 201 });
			} else {
				// Fallback: inline LLM execution if queue not configured
				const agent = agentId ? await prisma.agent.findUnique({ where: { id: agentId } }) : null;
				const system = agent
					? `You are ${agent.name}, a ${agent.role}. Respond in a ${agent.tone || 'professional'} tone, concise and actionable.`
					: `You are an AI Agent Employee who writes concise, actionable outputs.`;
				const userPrompt = description || title;
				const content = await generateText(system, userPrompt);
				const updated = await prisma.task.update({
					where: { id: task.id },
					data: {
						status: "needs_review",
						output: { text: content },
						startedAt: new Date(),
						completedAt: new Date(),
					},
					include: { agent: { select: { name: true, role: true } } },
				});
				return NextResponse.json(updated, { status: 201 });
			}
		}

		return NextResponse.json(task, { status: 201 });
	} catch (_err) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
} 