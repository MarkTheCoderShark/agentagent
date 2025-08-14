import { prisma } from "@/lib/prisma";
import { enqueueTaskExecute } from "@/lib/queue";

async function runDueWorkflows() {
  const now = new Date();
  const windowStart = new Date(now.getTime() - 60 * 1000);

  const workflows = await prisma.workflow.findMany({
    where: {
      status: "active",
    },
  });

  for (const wf of workflows) {
    const sched = wf.schedule as any;
    const hasCron = Boolean(sched?.cron);
    if (!hasCron) continue;

    // Skip if we've created a task for this workflow in the last minute
    const recent = await prisma.task.count({
      where: { workflowId: wf.id, createdAt: { gte: windowStart } },
    });
    if (recent > 0) continue;

    const task = await prisma.task.create({
      data: {
        title: `Scheduled run: ${wf.name}`,
        description: `Scheduled run triggered by scheduler`,
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
  }
}

runDueWorkflows()
  .then(() => process.exit(0))
  .catch((_err) => process.exit(1)); 