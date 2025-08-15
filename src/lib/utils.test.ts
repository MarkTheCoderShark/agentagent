import { describe, it, expect } from 'vitest'
import { getAgentLimitForTier, getTaskMonthlyLimitForTier, getCurrentMonthRange } from './utils'

describe('entitlement helpers', () => {
  it('returns correct agent limits per tier', () => {
    expect(getAgentLimitForTier('free')).toBe(1)
    expect(getAgentLimitForTier('starter')).toBe(3)
    expect(getAgentLimitForTier('pro')).toBe(10)
    expect(getAgentLimitForTier('enterprise')).toBeNull()
    expect(getAgentLimitForTier(undefined)).toBe(1)
  })

  it('returns correct monthly task limits per tier', () => {
    expect(getTaskMonthlyLimitForTier('free')).toBe(200)
    expect(getTaskMonthlyLimitForTier('starter')).toBe(1000)
    expect(getTaskMonthlyLimitForTier('pro')).toBe(5000)
    expect(getTaskMonthlyLimitForTier('enterprise')).toBeNull()
    expect(getTaskMonthlyLimitForTier(undefined)).toBe(200)
  })

  it('returns a sensible month range', () => {
    const { start, end } = getCurrentMonthRange()
    expect(start < end).toBe(true)
    const now = new Date()
    expect(start.getUTCMonth()).toBe(now.getUTCMonth())
  })
})