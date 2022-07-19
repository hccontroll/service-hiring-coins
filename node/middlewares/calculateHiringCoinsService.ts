/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
import { json } from 'co-body'
import { Transaction } from '../clients/hiringCoinsApi'

export async function calculateHiringCoinsService(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { orderApi, externalMasterData, hiringCoinsApi },
  } = ctx

  const body = await json(ctx.req)

  const orderId = body.OrderId

  const orderData = await orderApi.getOrderById(orderId)

  const userId = orderData.clientProfileData.userProfileId

  const orderCreationDate = orderData.creationDate

  const emailData = await externalMasterData.getUserEmailData(userId)

  const { email } = emailData[0]

  const name = `${orderData.clientProfileData.firstName} ${orderData.clientProfileData.lastName}`

  const clientHiringCoins = await hiringCoinsApi.putClient(name, email);

  const totalItemsValue = getTotalItems(orderData)

  const purchaseDate = new Date(orderCreationDate).toISOString()
  const purchaseValue = getTotalOrder(orderData)
  const coins = convertToHiringCoins(totalItemsValue)

  const transaction: Transaction = {
    clientUuid: clientHiringCoins.uuid,
    purchaseId: orderId,
    purchaseValue,
    purchaseDate,
    type: 'CREDIT',
    coins
  }

  await hiringCoinsApi.postTransaction(transaction);

  ctx.status = 200

  await next()
}

function getTotalOrder(order: any) {
  const digits: number =
    order.storePreferencesData.currencyFormatInfo.CurrencyDecimalDigits

  const totalItems = order.value / 10 ** digits

  return totalItems
}

function getTotalItems(order: any) {
  const digits: number =
    order.storePreferencesData.currencyFormatInfo.CurrencyDecimalDigits

  const totalItems = order.totals[0].value / 10 ** digits

  return totalItems
}

function convertToHiringCoins(value: number) {
  return Math.trunc(value)
}
