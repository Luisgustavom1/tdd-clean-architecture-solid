import { GetStorage } from '@/data/protocols/cache'
import { HttpClient } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request (params: HttpClient.Request): Promise<HttpClient.Response> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = Object.assign({
        'x-access-token': account.accessToken
      }, params.headers)
    }
    const httpResponse = await this.httpClient.request(params)
    return httpResponse
  }
}
