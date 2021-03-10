import { Application } from 'express'
import { LogController } from '../controllers/log.controller'

export class LogRoutes {

  public logController = new LogController()

  public routes(app: Application): void {
    app.route('/logs').get(this.logController.listLogs)
    app.route('/logs/topic/:topic').get(this.logController.listTopicLogs)
  }

}
