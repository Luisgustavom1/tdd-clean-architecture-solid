import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage, 
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse<HttpGetClient>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = Object.assign({
        'x-access-token': account.accessToken
      }, params.headers)
    }
    const httpResponse = await this.httpGetClient.get(params)
    return httpResponse
  }
}