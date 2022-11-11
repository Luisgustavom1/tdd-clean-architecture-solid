import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-use";
import { AddAccount } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, any>
  ) {}

  async add(body: AddAccount.Params): Promise<RemoteAddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body
    })
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()

      default: throw new UnexpectedError()
  }
  };
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}