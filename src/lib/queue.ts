import { Queue, Worker, JobsOptions } from 'bullmq'

const connectionUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || ''
const connectionToken = process.env.UPSTASH_REDIS_REST_TOKEN || ''

export type TaskJob = {
  userId: string
  taskId: string
  agentId?: string | null
  type: string
  description?: string | null
}

let queue: Queue<TaskJob> | null = null

export function getTaskQueue(): Queue<TaskJob> | null {
  if (!connectionUrl) return null
  if (!queue) {
    queue = new Queue<TaskJob>('task-exec', {
      connection: { url: connectionUrl, token: connectionToken } as any,
    })
  }
  return queue
}

export async function enqueueTask(job: TaskJob, options?: JobsOptions): Promise<string | null> {
  const q = getTaskQueue()
  if (!q) return null
  const j = await q.add('execute', job, options)
  return j.id as string
}