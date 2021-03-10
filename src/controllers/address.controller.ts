import { Request, Response } from 'express'
import { ResponseError, ResponseSuccess } from './../helpers/message.helper'
import { TransactionModel } from '../models/transaction.model'

export class AddressController {

  public async getAddress(req: Request, res: Response) {
    const address: string = req.params.address
    try {

      const outcount = await TransactionModel.countDocuments({
        from: address,
      })
      const incount = await TransactionModel
      .countDocuments({
        to: address,
      })
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
      return res.json(new ResponseSuccess({
        sent: outcount,
        received: incount,
        address,
      }))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_ADDRESS_DETAILS'))
    }
  }

}
