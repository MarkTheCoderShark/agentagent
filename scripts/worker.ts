import { Worker, Job } from "bullmq";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/llm";
import { runAction, ActionInput } from "@/lib/actions";

const redisUrl = process.env.UPSTASH_REDIS_URL;
const redisToken = process.env.UPSTASH_REDIS_TOKEN;

if (!redisUrl || !redisToken) {
  console.error("Worker missing UPSTASH_REDIS_URL/TOKEN env; exiting.");
  process.exit(1);
}

type TaskExecuteJob = {
  taskId: string;
  userId: string;
};

const worker = new Worker<TaskExecuteJob>(
  "task-execute",
  async (job: Job<TaskExecuteJob>) => {
    const { taskId, userId } = job.data;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return;

    try {
      const agent = task.agentId ? await prisma.agent.findUnique({ where: { id: task.agentId } }) : null;
      const system = agent
        ? `You are ${agent.name}, a ${agent.role}. Respond in a ${agent.tone || 'professional'} tone, concise and actionable.`
        : `You are an AI Agent Employee who writes concise, actionable outputs.`;
      const userPrompt = task.description || task.title;

      const result: any = { steps: [] };

      // Optional action before LLM if provided in input
      const maybeAction = (task.input as any)?.action as ActionInput | undefined;
      if (maybeAction && maybeAction.name) {
        const actionOut = await runAction({ ...maybeAction, userId });
        result.steps.push({ action: maybeAction.name, output: actionOut });
      }

      const content = await generateText(system, userPrompt || task.title);
      result.llm = { text: content };

      await prisma.task.update({
        where: { id: task.id },
        data: {
          status: "needs_review",
          output: result,
          completedAt: new Date(),
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await prisma.task.update({
        where: { id: task.id },
        data: { status: "failed", error: message },
      });
      throw err;
    }
  },
  {
    connection: {
      url: redisUrl!,
    },
  }
);

worker.on("completed", (_job: Job) => {});
worker.on("failed", (_job: Job | undefined, _err: Error) => {}); 