const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const MAX_REQUESTS = 10
const WINDOW_MS = 24 * 60 * 60 * 1000

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: now + WINDOW_MS }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count, resetTime: record.resetTime }
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
    totalIpsTracked: rateLimitMap.size,
    maxRequests: MAX_REQUESTS,
    windowHours: 24,
    storage: 'in-memory (Map) — SE REINICIA en cold start de Vercel',
  }
}
