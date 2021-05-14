import { Application } from 'express'
import { EtherExplorerController } from '../controllers/ether-explorer.controller'
import { TransactionController } from '../controllers/transaction.controller'

export class TransactionRoutes {

  public transactionController = new TransactionController()
  public etherExplorerController = new EtherExplorerController()

  public routes(app: Application): void {
    app.route('/txs/from/:address').get(this.transactionController.listTransactionsFrom)
    app.route('/txs/to/:address').get(this.transactionController.listTransactionsTo)
    app.route('/txs').get(this.etherExplorerController.index)
    app.route('/tx/:hash').get(this.transactionController.getTransaction)
    app.route('/txs/block/:number').get(this.transactionController.listBlockNumberTransactions)
    app.route('/txs/swaplist').get(this.transactionController.swapList)
  }

}
