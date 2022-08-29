import { HttpGetClient, HttpGetParams } from "../protocols/http";

export class HttpGetClientSpy implements HttpGetClient {
  url: string 
  
  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}