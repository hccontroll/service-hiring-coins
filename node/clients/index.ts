import { IOClients } from '@vtex/api'

import OrderApi from './orderApi'
import ExternalMasterdata from './externalMasterdata'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get externalMasterData() {
    return this.getOrSet('externalMasterData', ExternalMasterdata)
  }

  public get orderApi() {
    return this.getOrSet('orderApi', OrderApi)
  }
}
