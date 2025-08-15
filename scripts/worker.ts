import { Worker } from 'bullmq'
import { prisma } from '@/lib/prisma'
import { generateText } from '@/lib/llm'
import { TaskJob } from '@/lib/queue'

const connection = {
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || undefined,
} as any

async function main() {
  if (!connection.url) {
    console.log('Queue worker disabled: no Redis URL configured')
    return
  }

  const worker = new Worker<TaskJob>('task-exec', async (job) => {
    const { taskId, agentId, type, description } = job.data

    const agent = agentId ? await prisma.agent.findUnique({ where: { id: agentId } }) : null
    const system = agent
      ? `You are ${agent.name}, a ${agent.role}. Respond in a ${agent.tone || 'professional'} tone, concise and actionable.`
      : `You are an AI Agent Employee who writes concise, actionable outputs.`
    const userPrompt = description || type
    const content = await generateText(system, userPrompt)

    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: 'needs_review',
        output: { text: content },
        startedAt: new Date(),
        completedAt: new Date(),
      },
    })
  }, { connection })

  worker.on('completed', (job) => {
    console.log('Completed job', job.id)
  })
  worker.on('failed', (job, err) => {
    console.error('Failed job', job?.id, err)
    if (job?.data?.taskId) {
      prisma.task.update({ where: { id: job.data.taskId }, data: { status: 'failed', error: String(err) } }).catch(() => {})
    }
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})