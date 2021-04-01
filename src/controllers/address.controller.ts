import { Request, Response } from 'express'
import { ResponseError, ResponseSuccess } from './../helpers/message.helper'
import { TransactionModel } from '../models/transaction.model'
import Web3 from 'web3'
import { WEB3_URL } from '../config/web3'

export class AddressController {

  static web3 = new Web3(WEB3_URL)

  public async getAddress(req: Request, res: Response) {
    const address: string = req.params.address
    try {

      const [outcount, incount, balance] = await Promise.all([
        TransactionModel.countDocuments({
          from: address,
        }),
        TransactionModel
          .countDocuments({
            to: address,
          }),
          AddressController.web3.eth.getBalance(address),
      ])
      res.setHeader('Cache-Control', 'public, max-age=20, s-maxage=20')
      return res.json(new ResponseSuccess({
        sent: outcount,
        received: incount,
        address,
        balance,
      }))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_ADDRESS_DETAILS'))
    }
  }

}
