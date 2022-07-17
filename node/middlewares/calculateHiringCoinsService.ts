/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
import { json } from 'co-body'

export async function calculateHiringCoinsService(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { orderApi, externalMasterData },
  } = ctx

  const body = await json(ctx.req)

  const orderId = body.OrderId

  const orderData = await orderApi.getOrderById(orderId)

  const userId = orderData.clientProfileData.userProfileId

  const orderCreationDate = orderData.creationDate

  const emailData = await externalMasterData.getUserEmailData(userId)

  const { email } = emailData[0]

  const name = `${orderData.clientProfileData.firstName} ${orderData.clientProfileData.lastName}`

  const totalItemsValue = getTotalItems(orderData)

  const purchaseDate = new Date(orderCreationDate).toISOString()
  const purchaseValue = getTotalOrder(orderData)
  const coins = convertToHiringCoins(totalItemsValue)

  console.log(`Email: ${email}`)
  console.log(`Name: ${name}`)
  console.log(`Order Id: ${orderId}`)
  console.log(`Purchase Date: ${purchaseDate}`)
  console.log(`Purchase Value: ${purchaseValue}`)
  console.log(`Items Value: ${totalItemsValue}`)
  console.log(`Generated Coins: ${coins}`)

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
