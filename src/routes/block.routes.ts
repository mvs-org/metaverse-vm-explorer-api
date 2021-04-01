import { Application } from 'express'
import { BlockController } from '../controllers/block.controller'

export class BlockRoutes {

  public blockController = new BlockController()

  public routes(app: Application): void {
    app.route('/height').get(this.blockController.getHeight)
    app.route('/blocks').get(this.blockController.listBlocks)
    app.route('/block/:number').get(this.blockController.getBlockByNumber)
  }

}
