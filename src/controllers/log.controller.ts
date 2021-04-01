import { Request, Response } from 'express'
import { ResponseError, ResponseSuccess } from '../helpers/message.helper'
import { LogModel } from '../models/log.model'

export class LogController {

  async listLogs(req: Request, res: Response) {
    try {
      const logs = await LogModel.find({}, { _id: 0, }, { sort: { number: -1 }, limit: 20 })
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(logs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_LOGS'))
    }
  }

  async listTopicLogs(req: Request, res: Response) {
    const topic: string = req.params.topic
    try {
      const logs = await LogModel.find({topic}, { _id: 0, }, { sort: { logIndex: -1 }, limit: 20 })
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(logs))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_LOGS'))
    }
  }

}
