import { Worker, Job } from "bullmq";
import { prisma } from "@/lib/prisma";
import { generateText } from "@/lib/llm";

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
    const { taskId } = job.data;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return;

    try {
      const agent = task.agentId ? await prisma.agent.findUnique({ where: { id: task.agentId } }) : null;
      const system = agent
        ? `You are ${agent.name}, a ${agent.role}. Respond in a ${agent.tone || 'professional'} tone, concise and actionable.`
        : `You are an AI Agent Employee who writes concise, actionable outputs.`;
      const userPrompt = task.description || task.title;
      const content = await generateText(system, userPrompt || task.title);

      await prisma.task.update({
        where: { id: task.id },
        data: {
          status: "needs_review",
          output: { text: content },
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

worker.on("completed", (_job: Job) => {
  // no-op
});

worker.on("failed", (_job: Job | undefined, _err: Error) => {
  // no-op, task updated above
}); 