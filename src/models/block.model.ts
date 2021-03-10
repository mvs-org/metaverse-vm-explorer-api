import { Schema, model } from 'mongoose'

export const BlockSchema = new Schema({
  number: {
      type: Number,
      index: true,
  },
  hash: {
      type: String,
      unique: true,
  },
  size: Number,
  transactions: [String],
  parentHash: String,
  timestamp: Number,
  gasUsed: Number,
  miner: String,
}, {
  collection: 'block',
})

export const BlockModel = model('Block', BlockSchema)