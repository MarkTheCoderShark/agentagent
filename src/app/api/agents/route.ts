import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAgentLimitForTier } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, role, description, tone, template } = await request.json();

    if (!name || !role) {
      return NextResponse.json(
        { message: "Name and role are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentAgentCount = await prisma.agent.count({ where: { userId: user.id } });
    const agentLimit = getAgentLimitForTier(user.subscriptionTier as any);
    if (currentAgentCount >= agentLimit) {
      return NextResponse.json(
        { message: "Agent limit reached for your plan" },
        { status: 403 }
      );
    }

    const agent = await prisma.agent.create({
      data: {
        name,
        role,
        description,
        tone: tone || "professional",
        avatar: getAvatarForTemplate(template),
        userId: session.user.id,
        memory: {
          context: `I am ${name}, a ${role.toLowerCase()}. I communicate in a ${tone || "professional"} tone.`,
          capabilities: getCapabilitiesForTemplate(template),
        },
      },
    });

    await prisma.task.create({
      data: {
        title: `Welcome task for ${agent.name}`,
        description: `Introduce yourself and confirm setup for the ${agent.role} role.`,
        type: "setup",
        status: "completed",
        userId: session.user.id,
        agentId: agent.id,
        input: { onboarding: true },
        output: { message: `Hi, I'm ${agent.name}, your ${agent.role}. I'm ready to help!` },
        startedAt: new Date(),
        completedAt: new Date(),
      },
    });

    return NextResponse.json(agent, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const agents = await prisma.agent.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(agents);
  } catch (_error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

function getAvatarForTemplate(template: string): string {
  const avatars: { [key: string]: string } = {
    marketing: "📈",
    support: "👩‍💼",
    analyst: "📊",
    content: "✍️",
    operations: "⚙️",
    custom: "🤖",
  };
  return avatars[template] || "🤖";
}

function getCapabilitiesForTemplate(template: string): string[] {
  const capabilities: { [key: string]: string[] } = {
    marketing: [
      "Social media content creation",
      "Email newsletter drafting",
      "Ad performance analysis",
      "Content calendar management",
    ],
    support: [
      "Email response automation",
      "Ticket management",
      "FAQ handling",
      "Customer satisfaction tracking",
    ],
    analyst: [
      "Data analysis and reporting",
      "Trend identification",
      "Performance metrics",
      "Insight generation",
    ],
    content: [
      "Blog post writing",
      "Copy creation",
      "Content optimization",
      "SEO content planning",
    ],
    operations: [
      "Schedule management",
      "Spreadsheet updates",
      "Admin task automation",
      "Process documentation",
    ],
    custom: [
      "Custom workflow creation",
      "Specific task automation",
      "Tailored integrations",
      "Personalized responses",
    ],
  };
  return capabilities[template] || ["Custom tasks"];
} 