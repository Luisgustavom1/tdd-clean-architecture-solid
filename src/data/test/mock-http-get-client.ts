import { HttpGetClient, HttpGetParams, HttpStatusCode, HttpResponse } from "../protocols/http";

export class HttpGetClientSpy<Response> implements HttpGetClient<Response> {
  url: string 
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }
  async get(params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url;
    return this.response
  }
}