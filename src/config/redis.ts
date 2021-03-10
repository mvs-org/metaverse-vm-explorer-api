export const enabled = (process.env.REDIS_ENABLED) ? process.env.REDIS_ENABLED == 'true' : false
export const config = {
        host: (process.env.REDIS_HOST) ? process.env.REDIS_HOST : '127.0.0.1',
        password: undefined,
        port: (process.env.REDIS_PORT) ? parseInt(process.env.REDIS_PORT, 10) : 6379,
        socket_keepalive: true,
}
