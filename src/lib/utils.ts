import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";

export function getAgentLimitForTier(tier: SubscriptionTier): number {
  switch (tier) {
    case "free":
      return 1;
    case "starter":
      return 3;
    case "pro":
      return 10;
    case "enterprise":
      return Number.POSITIVE_INFINITY;
  }
}

export function getMonthlyTaskLimitPerAgentForTier(tier: SubscriptionTier): number {
  switch (tier) {
    case "free":
      return 100; // assumption for MVP
    case "starter":
      return 1000;
    case "pro":
      return 5000;
    case "enterprise":
      return Number.POSITIVE_INFINITY;
  }
}

export function getMonthRange(date: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
}
