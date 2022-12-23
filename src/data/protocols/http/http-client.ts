export interface HttpClient<R = any> {
  request: (data: HttpClient.Request) => Promise<HttpClient.Response<R>>
}

export namespace HttpClient {
  export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

  export enum StatusCode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500
  }

  export type Response<BodyResponse = any> = {
    statusCode: StatusCode
    body?: BodyResponse
  }

  export type Request = {
    url: string
    method: HttpClient.Method
    body?: any
    headers?: any
  }
}
