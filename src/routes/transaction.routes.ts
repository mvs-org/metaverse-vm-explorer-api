import { Application } from 'express'
import { TransactionController } from '../controllers/transaction.controller'

export class TransactionRoutes {

  public transactionController = new TransactionController()

  public routes(app: Application): void {
    app.route('/txs/from/:address').get(this.transactionController.listTransactionsFrom)
    app.route('/txs/to/:address').get(this.transactionController.listTransactionsTo)
    app.route('/txs').get(this.transactionController.listTransactions)
    app.route('/tx/:hash').get(this.transactionController.getTransaction)
    app.route('/txs/block/:number').get(this.transactionController.listBlockNumberTransactions)
  }

}
