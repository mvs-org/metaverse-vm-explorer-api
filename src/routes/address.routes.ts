import { Application } from 'express'
import { AddressController } from '../controllers/address.controller'

export class AddressRoutes {

  public addressController: AddressController =  new AddressController()

  public routes(app: Application): void {
    app.route('/address/:address').get(this.addressController.getAddress)
  }
}
