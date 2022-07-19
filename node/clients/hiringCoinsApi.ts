/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class HiringCoinsApi extends ExternalClient {
  constructor(context: IOContext) {
    super(`https://hccontroll03.app.br`, context, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async putClient(name: string, email: string): Promise<Client> {
    return this.http.put(`v1/clients`, {
      name,
      email,
    })
  }

  public async postTransaction({
    clientUuid,
    purchaseId,
    purchaseValue,
    purchaseDate,
    type,
    coins,
  }: Transaction): Promise<any> {
    return this.http.post(`v1/transactions`, {
      clientUuid,
      purchaseId,
      purchaseValue,
      purchaseDate,
      type,
      coins,
    })
  }
}

interface Client {
  uuid: string;
  name: string;
  email: string;
  lastPurchase: string;
  coinBalance: number;
}

export interface Transaction {
  clientUuid: string;
  purchaseId: string;
  purchaseValue: number;
  purchaseDate: string;
  type: 'CREDIT' | 'DEBIT';
  coins: number;
}
