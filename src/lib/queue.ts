import { Queue } from "bullmq";

export type TaskExecuteJob = {
  taskId: string;
  userId: string;
};

let taskQueueSingleton: Queue<TaskExecuteJob> | null = null;

export function getTaskQueue(): Queue<TaskExecuteJob> | null {
  if (taskQueueSingleton) return taskQueueSingleton;

  const redisUrl = process.env.UPSTASH_REDIS_URL;
  const redisToken = process.env.UPSTASH_REDIS_TOKEN;

  if (!redisUrl || !redisToken) {
    return null;
  }

  taskQueueSingleton = new Queue<TaskExecuteJob>("task-execute", {
    connection: {
      url: redisUrl,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: 1000,
      removeOnFail: 1000,
    },
  });

  return taskQueueSingleton;
}

export async function enqueueTaskExecute(job: TaskExecuteJob): Promise<boolean> {
  const queue = getTaskQueue();
  if (!queue) return false;
  await queue.add("execute", job, { jobId: job.taskId });
  return true;
} 