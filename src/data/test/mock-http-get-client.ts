import { HttpGetClient, HttpGetParams, HttpStatusCode, HttpResponse } from '../protocols/http'

export class HttpGetClientSpy<Response = Record<string, any>> implements HttpGetClient<Response> {
  url: string
  headers: ObjectLiteral
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
