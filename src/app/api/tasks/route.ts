import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/llm";
import { getTaskMonthlyLimitForTier, getCurrentMonthRange } from "@/lib/utils";
import { enqueueTask, getTaskQueue } from "@/lib/queue";

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

		// Enforce monthly task limits when executing (non-demo)
		if (execute && type !== "demo") {
			const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { subscriptionTier: true } });
			const limit = getTaskMonthlyLimitForTier(user?.subscriptionTier);
			if (limit !== null) {
				const { start, end } = getCurrentMonthRange();
				const count = await prisma.task.count({
					where: {
						userId: session.user.id,
						createdAt: { gte: start, lt: end },
					},
				});
				if (count >= limit) {
					return NextResponse.json({ message: "Monthly task limit reached for current plan" }, { status: 403 });
				}
			}
		}

		// Create the task base
		let task = await prisma.task.create({
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

		// Execute path: enqueue when queue available, else inline
		if (execute && type !== "demo") {
			if (getTaskQueue()) {
				// mark in progress and enqueue
				task = await prisma.task.update({ where: { id: task.id }, data: { status: 'in_progress' }, include: { agent: { select: { name: true, role: true } } } })
				await enqueueTask({ userId: session.user.id, taskId: task.id, agentId: agentId || null, type, description })
				return NextResponse.json(task, { status: 201 })
			} else {
				// fallback inline
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