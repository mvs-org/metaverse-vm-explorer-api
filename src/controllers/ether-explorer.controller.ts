import { Request, Response } from 'express'
import { ResponseSuccess } from '../helpers/message.helper'
import { BlockModel } from '../models/block.model'
import { TransactionModel } from '../models/transaction.model'

export class EtherExplorerController {

  async index(req: Request, res: Response){
    switch(req.query.action){
      case 'tokentx':
        return EtherExplorerController.listTokenTransactions(req, res)
      case 'txlist':
        default:
        return EtherExplorerController.listTransactions(req, res)
    }
  }

  static async listTokenTransactions(req: Request, res: Response){
    // define filters
    const address = req.query.address
    const startblock = req.query.startblock || 0
    const endblock = req.query.endblock || 10000000000000

    // define result options
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || Number(req.query.offset) || 10
    const skip = page * limit
    const sort = req.query.sort == 'asc' ? 1 : -1

    let txs = await TransactionModel.find({
      blockNumber: {
        $gte: startblock,
        $lte: endblock,
      },
      'details.type': 'token_transfer',
      $or: [
        {
          'details.metadata.from': address,
        },
        {
          'details.metadata.to': address,
        }
      ]
    }, {
      hash: 1,
      _id: 0,
      blockNumber: 1,
      blockHash: 1,
      nonce: 1,
      to: 1,
      from: 1,
      confirmedAt: 1,
      input: 1,
      value: 1,
      gas: 1,
      gasPrice: 1,
      'details.metadata': 1,
      'receipt.status': 1,
      'receipt.gasUsed': 1,
      'receipt.contractAddress': 1,
    }, {
      collation: { locale: 'en', strength: 2 },
      limit,
      skip,
      sort: {
        blockNumber: sort,
      }
    })
    const latestBlock = await BlockModel.findOne({}, { _id: 0, }, { sort: { number: -1 } })
    txs = txs.map((tx:any)=>{
      return {
        blockNumber: tx.blockNumber,
        timeStamp: tx.confirmedAt,
        hash: tx.hash,
        nonce: tx.nonce,
        gas: tx.gas,
        from: tx.details?.metadata?.from,
        value: tx.details?.metadata?.value,
        tokenName: tx.details?.metadata?.name,
        tokenSymbol: tx.details?.metadata?.symbol,
        tokenDecimal: tx.details?.metadata?.decimals,
        to: tx.details?.metadata?.to,
        gasPrice: tx.gasPrice,
        txreceipt_status: tx.receipt?.status ? 1 : 0,
        input: tx.input,
        contractAddress: tx.to,
        blockHash: tx.blockHash,
        gasUsed: tx.receipt?.gasUsed,
        confirmations: Math.max(latestBlock.number - tx.blockNumber, 0)
      }
    })
    return res.json(new ResponseSuccess(txs))
  }

  static async listTransactions(req: Request, res: Response){
    // define filters
    const address = req.query.address
    const startblock = req.query.startblock || 0
    const endblock = req.query.endblock || 10000000000000

    // define result options
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || Number(req.query.offset) || 10
    const skip = page * limit
    const sort = req.query.sort == 'asc' ? 1 : -1

    let txs = await TransactionModel.find({
      blockNumber: {
        $gte: startblock,
        $lte: endblock,
      },
      $or: [
        {
          from: address,
        },
        {
          to: address,
        }
      ]
    }, {
      hash: 1,
      _id: 0,
      blockNumber: 1,
      blockHash: 1,
      nonce: 1,
      to: 1,
      from: 1,
      confirmedAt: 1,
      input: 1,
      value: 1,
      gas: 1,
      gasPrice: 1,
      'receipt.status': 1,
      'receipt.gasUsed': 1,
      'receipt.contractAddress': 1,
    }, {
      collation: { locale: 'en', strength: 2 },
      limit,
      skip,
      sort: {
        blockNumber: sort,
      }
    })
    const latestBlock = await BlockModel.findOne({}, { _id: 0, }, { sort: { number: -1 } })
    txs = txs.map((tx:any)=>{
      return {
        blockNumber: tx.blockNumber,
        timeStamp: tx.confirmedAt,
        hash: tx.hash,
        nonce: tx.nonce,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        txreceipt_status: tx.receipt?.status ? 1 : 0,
        contractAddress: tx.to,
        blockHash: tx.blockHash,
        gasUsed: tx.receipt?.gasUsed,
        confirmations: Math.max(latestBlock.number - tx.blockNumber, 0)
      }
    })
    return res.json(new ResponseSuccess(txs))
  }
}
