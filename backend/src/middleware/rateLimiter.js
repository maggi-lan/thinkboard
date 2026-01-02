
import ratelimit from "../config/upstash.js";

// Rate limiter middleware function
const rateLimiter = async (req, res, next) => {
    try {
        // Limits how often this endpoint can be called
        const { success } = await ratelimit.limit("my-limit-key");

        // Return 429 error response if rate limit is exceeded
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, Please try again later"
            });
        }

        // Continue to the next middleware if rate limit isn't exceeded
        next();
    }

    // Handle undexpected rate limiter errors
    catch (error) {
        console.log(`Rate Limit Error: ${error}`);
        next(error);
    }
}

// Export the rateLimiter function
export default rateLimiter;
