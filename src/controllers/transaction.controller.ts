import { Request, Response } from 'express'
import { ResponseError, ResponseSuccess } from '../helpers/message.helper'
import { TransactionModel } from '../models/transaction.model'

export class TransactionController {

  async listTransactionsFrom(req: Request, res: Response) {
    const address: string = req.params.address
    try {
      const txs = await TransactionModel.find({
        from: address,
      }, {
        hash: 1,
        _id: 0,
        blockNumber: 1,
        creates: 1,
        to: 1,
        from: 1,
        value: 1,
        gas: 1,
        gasPrice: 1,
        'receipt.status': 1,
      }, {collation: { locale: 'en', strength: 2 }})
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(txs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_ADDRESS_TXS'))
    }
  }

  async listTransactionsTo(req: Request, res: Response) {
    const address: string = req.params.address
    try {
      const txs = await TransactionModel.find({
        to: address,
      }, {
        hash: 1,
        _id: 0,
        blockNumber: 1,
        creates: 1,
        to: 1,
        from: 1,
        value: 1,
        gas: 1,
        gasPrice: 1,
        'receipt.status': 1,
      }, {collation: { locale: 'en', strength: 2 }})
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(txs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_ADDRESS_TXS'))
    }
  }

  async listBlockNumberTransactions(req: Request, res: Response) {
    const blockNumber = Number(req.params.number)
    try {
      const txs = await TransactionModel.find({
        blockNumber,
      }, {
        hash: 1,
        _id: 0,
        blockNumber: 1,
        creates: 1,
        to: 1,
        from: 1,
        value: 1,
        gas: 1,
        gasPrice: 1,
        'receipt.status': 1,
      }, {collation: { locale: 'en', strength: 2 }})
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(txs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_BLOCK_TXS'))
    }
  }
  
  async getTransaction(req: Request, res: Response) {
    const hash: string = req.params.hash
    try {
      const tx = await TransactionModel.findOne({
        hash,
      }, {
        _id: 0,
      })
      if (!tx) {
        throw Error('ERR_TX_NOT_FOUND')
      }
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60')
      return res.json(new ResponseSuccess(tx))
    } catch (err) {
      switch (err.message) {
        case 'ERR_TX_NOT_FOUND':
          return res.status(404).json(new ResponseError(err.message))
      }
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_TX'))
    }
  }

  async listTransactions(req: Request, res: Response){

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
      createdAt: 1,
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
    txs = txs.map((tx:any)=>{
      return {
        blockNumber: tx.blockNumber,
        timeStamp: tx.createdAt,
        hash: tx.hash,
        nonce: tx.nonce,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        gas: tx.gas,
        gasPrice: tx.gasPrice,
        txreceipt_status: tx.receipt.status ? 1 : 0,
        input: tx.data,
        contractAddress: tx.receipt.contractAddress,
        blockHash: tx.blockHash,
        gasUsed: tx.receipt.gasUsed,
      }
    })
    return res.json(new ResponseSuccess(txs))
  }
}
