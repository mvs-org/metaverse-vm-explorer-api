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
        value: 1,
        gas: 1,
        gasPrice: 1,
        'receipt.status': 1,
      })
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
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
        value: 1,
        gas: 1,
        gasPrice: 1,
        'receipt.status': 1,
      })
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
      return res.json(new ResponseSuccess(txs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_ADDRESS_TXS'))
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
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
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
}
