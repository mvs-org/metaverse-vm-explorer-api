import { options } from 'apicache'
import { createClient } from 'redis'
import { config as redis_config, enabled as redis_enabled } from '../config/redis.js'
const cache = options({
  redisClient: (redis_enabled) ? createClient(redis_config) : undefined,
  statusCodes: { include: [200] },
})
  .middleware

// Define cache rules to only cache if result was successfull
export const hourCacheSuccess = cache('60 minutes')
export const longCacheSuccess = cache('5 minutes')
export const mediumCacheSuccess = cache('1 minutes')
export const shortCacheSuccess = cache('20 seconds')
