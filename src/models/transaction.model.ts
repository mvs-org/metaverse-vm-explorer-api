import { Schema, model } from 'mongoose'

export const TransactionLogSchema = new Schema({
  id: {
      type: String,
  },
  transactionHash: {
      type: String,
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
})

export const TransactionReceiptSchema = new Schema({
  status: Boolean,
  transactionHash: String,
  transactionIndex: Number,
  blockHash: String,
  blockNumber: Number,
  from: String,
  to: String,
  contractAddress: String,
  cumulativeGasUsed: Number,
  gasUsed: Number,
  logs: [TransactionLogSchema],
  logsBloom: String,
})


export const TransactionSchema = new Schema({
  hash: {
      type: String,
      unique: true,
  },
  blockHash: {
      type: String,
  },
  blockNumber: Number,
  from: {
      type: String,
      index: true,
  },
  to: {
      type: String,
      index: true,
  },
  value: String,
  gas: Number,
  nonce: Number,
  confirmedAt: Number,
  input: String,
  gasPrice: Number,
  creates: {
      type: String,
      index: true,
  },
  receipt: TransactionReceiptSchema,
  details: Object,
}, {
  collection: 'tx',
})

export const TransactionModel = model('Tx', TransactionSchema)