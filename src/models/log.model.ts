import { Schema, model } from 'mongoose'

export const LogSchema = new Schema({
  id: {
      type: String,
  },
  transactionHash: {
      type: String,
      index: true,
  },
  transactionIndex: Number,
  logIndex: Number,
  address: String,
  blockNumber: Number,
  blockHash: String,
  data: String,
  gas: Number,
  gasPrice: Number,
  creates: String,
  removed: Boolean,
  topics: [String],
}, {
  collection: 'log',
}).index({
  transactionHash: 1,
  logIndex: 1,
}, { unique: true })

export const LogModel = model('Log', LogSchema)