// Simple in-memory rate limiter
// For production, consider using Redis-based rate limiting

const rateLimitStore = new Map();

/**
 * Rate limiting middleware
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} maxRequests - Maximum requests per window
 */
export function rateLimiter(windowMs = 60000, maxRequests = 10) {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();

        // Clean up old entries
        if (rateLimitStore.has(ip)) {
            const userLimits = rateLimitStore.get(ip);
            userLimits.requests = userLimits.requests.filter(
                timestamp => now - timestamp < windowMs
            );

            if (userLimits.requests.length >= maxRequests) {
                const oldestRequest = userLimits.requests[0];
                const resetTime = oldestRequest + windowMs;
                const timeRemaining = Math.ceil((resetTime - now) / 1000);

                return res.status(429).json({
                    success: false,
                    error: `Too many requests. Please try again in ${timeRemaining} seconds.`,
                    retryAfter: timeRemaining,
                });
            }

            userLimits.requests.push(now);
        } else {
            rateLimitStore.set(ip, {
                requests: [now],
            });
        }

        next();
    };
}

