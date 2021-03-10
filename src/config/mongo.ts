export const enabled = (process.env.MONGO_ENABLED) ? process.env.MONGO_ENABLED === 'true' : true
export const url = (process.env.MONGO_URL) ? process.env.MONGO_URL : 'mongodb://localhost:27017/testnet'
