import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAgentLimitForTier(tier: string | null | undefined): number | null {
  switch ((tier || "free").toLowerCase()) {
    case "free":
      return 1
    case "starter":
      return 3
    case "pro":
      return 10
    case "enterprise":
      return null // unlimited
    default:
      return 1
  }
}

export function getTaskMonthlyLimitForTier(tier: string | null | undefined): number | null {
  switch ((tier || "free").toLowerCase()) {
    case "free":
      return 200
    case "starter":
      return 1000
    case "pro":
      return 5000
    case "enterprise":
      return null // unlimited
    default:
      return 200
  }
}

export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0))
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0))
  return { start, end }
}
