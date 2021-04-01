import { Request, Response } from 'express'
import { ResponseError, ResponseSuccess } from '../helpers/message.helper'
import { BlockModel } from '../models/block.model'

export class BlockController {

  async listBlocks(req: Request, res: Response) {
    try {
      const blocks = await BlockModel.find({}, { _id: 0, }, { sort: { number: -1 }, limit: 20 })
      res.setHeader('Cache-Control', 'public, max-age=5, s-maxage=5')
      return res.json(new ResponseSuccess(blocks))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_LIST_BLOCKS'))
    }
  }

  async getHeight(req: Request, res: Response) {
    try {
      const latestBlock = await BlockModel.findOne({}, { _id: 0, }, { sort: { number: -1 } })
      res.setHeader('Cache-Control', 'public, max-age=5, s-maxage=5')
      return res.json(new ResponseSuccess(latestBlock.number))
    } catch (err) {
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_LATEST_BLOCK'))
    }
  }

  async getBlockByHash(req: Request, res: Response) {
    const hash: string = req.params.hash
    try {
      const tx = await BlockModel.findOne({
        hash,
      }, {
        _id: 0,
      })
      if (!tx) {
        throw Error('ERR_BLOCK_NOT_FOUND')
      }
      res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600')
      return res.json(new ResponseSuccess(tx))
    } catch (err) {
      switch (err.message) {
        case 'ERR_BLOCK_NOT_FOUND':
          return res.status(404).json(new ResponseError(err.message))
      }
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_BLOCK'))
    }
  }

  async getBlockByNumber(req: Request, res: Response) {
    const number = Number(req.params.number)
    try {
      const tx = await BlockModel.findOne({
        number,
      }, {
        _id: 0,
      })
      if (!tx) {
        throw Error('ERR_BLOCK_NOT_FOUND')
      }
      res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10')
      return res.json(new ResponseSuccess(tx))
    } catch (err) {
      switch (err.message) {
        case 'ERR_BLOCK_NOT_FOUND':
          return res.status(404).json(new ResponseError(err.message))
      }
      console.error(err)
      return res.status(500).json(new ResponseError('ERR_GET_BLOCK'))
    }
  }

}
