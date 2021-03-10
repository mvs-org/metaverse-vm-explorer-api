import * as bodyParser from 'body-parser'
import express from 'express'
import { connect } from 'mongoose'
import { enabled as mongoEnabled, url as mongoUrl } from './config/mongo'
import { AddressRoutes } from './routes/address.routes';
import { TransactionRoutes } from './routes/transaction.routes';
import { BlockRoutes } from './routes/block.routes'
import { LogRoutes } from './routes/log.routes'
import morgan from 'morgan'

class App {

  public app: express.Application
  public addressRoutes = new AddressRoutes()
  public transactionRoutes = new TransactionRoutes()
  public blockRoutes = new BlockRoutes()
  public logRoutes = new LogRoutes()

  constructor() {
    

    this.app = express()
    this.app.use(morgan('combined'))

    this.config()

    // set routes
    this.addressRoutes.routes(this.app)
    this.transactionRoutes.routes(this.app)
    this.blockRoutes.routes(this.app)
    this.logRoutes.routes(this.app)

    if (mongoEnabled) {
      this.mongoSetup()
    } else {
      console.log(`mongodb disabled by config`)
    }
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json())
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.header('Content-Type', 'application/json')
      next()
    })
  }

  private async mongoSetup(): Promise<void> {
    console.debug('connect to mongodb')
    connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    console.info('connected to mongodb')
  }

}

export default new App().app
