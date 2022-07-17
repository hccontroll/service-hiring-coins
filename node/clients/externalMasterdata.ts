/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ExternalMasterdata extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        ...options?.headers,
        ...(context.authToken
          ? { VtexIdclientAutCookie: context.authToken }
          : null),
        'Content-Type': 'application/json',
      },
    })
  }

  public async getUserEmailData(userId: string): Promise<any> {
    return this.http.get(
      `api/dataentities/CL/search?_fields=email&_where=userId%3D${userId}
        &_schema=CL&_keyword=String%20to%20search&_sort=firstName%20ASC`
    )
  }
}
