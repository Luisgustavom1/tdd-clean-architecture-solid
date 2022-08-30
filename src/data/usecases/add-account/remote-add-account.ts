import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-user";
import { AccountModel } from "@/domain/model";
import { AddAccount, AddAccountParams } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, any>
  ) {}

  async add(body: AddAccountParams): Promise<AccountModel> {
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