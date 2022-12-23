import { HttpClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { EmailInUseError } from '@/domain/errors/email-in-use'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccount.Model>
  ) {}

  async add (body: AddAccount.Params): Promise<RemoteAddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body
    })

    switch (httpResponse.statusCode) {
      case HttpClient.StatusCode.ok: return httpResponse.body
      case HttpClient.StatusCode.forbidden: throw new EmailInUseError()

      default: throw new UnexpectedError()
    }
  };
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
