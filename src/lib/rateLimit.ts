import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const MAX_REQUESTS = 10
const WINDOW_SECONDS = 24 * 60 * 60

const hasUpstash = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

let redis: Redis | null = null
let rateLimiter: Ratelimit | null = null

if (hasUpstash) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  rateLimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(MAX_REQUESTS, `${WINDOW_SECONDS} s`),
    analytics: false,
    prefix: 'rl:reformaspro',
  })
}

const memoryStore = new Map<string, { count: number; resetTime: number }>()

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; remaining: number; resetTime: number; storage: 'upstash' | 'memory' }> {
  if (rateLimiter) {
    try {
      const { success, remaining, reset } = await rateLimiter.limit(ip)
      return {
        allowed: success,
        remaining,
        resetTime: reset,
        storage: 'upstash',
      }
    } catch (error) {
      console.error('Upstash falló, fallback a memoria:', error)
    }
  }

  const now = Date.now()
  const record = memoryStore.get(ip)

  if (!record || now > record.resetTime) {
    memoryStore.set(ip, { count: 1, resetTime: now + WINDOW_SECONDS * 1000 })
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: now + WINDOW_SECONDS * 1000,
      storage: 'memory',
    }
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      storage: 'memory',
    }
  }

  record.count++
  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    resetTime: record.resetTime,
    storage: 'memory',
  }
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp.trim()
  }
  return '127.0.0.1'
}

export function getRateLimitStatus() {
  return {
    hasUpstash,
    storage: hasUpstash ? 'upstash-redis (persistente)' : 'in-memory (FALLBACK no persistente)',
    maxRequests: MAX_REQUESTS,
    windowHours: 24,
  }
}
