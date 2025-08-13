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
		const { status, notes } = await request.json();
		if (!status || !["approved", "rejected", "needs_review", "completed"].includes(status)) {
			return NextResponse.json({ message: "Invalid status" }, { status: 400 });
		}
		const resolvedParams = await params;
		const task = await prisma.task.update({
			where: { id: resolvedParams.id },
			data: {
				status,
				output: notes ? { notes } : undefined,
			},
		});
		return NextResponse.json(task);
	} catch (_err) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
} 