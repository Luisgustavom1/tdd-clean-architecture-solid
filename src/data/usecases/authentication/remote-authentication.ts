import { HttpClient } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { Authentication } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) { }

  async auth (params: Authentication.Params): Promise<RemoteAuthentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpClient.StatusCode.ok: return httpResponse.body
      case HttpClient.StatusCode.unauthorized: throw new InvalidCredentialsError()

      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
