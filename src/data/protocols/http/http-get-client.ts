import { HttpResponse } from "."

export type HttpGetParams = {
  url: string,
  headers: Record<string, any>
}

export interface HttpGetClient<Response = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<Response>>
}