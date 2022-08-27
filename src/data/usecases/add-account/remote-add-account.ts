import { HttpPostClient, HttpPostCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-user";
import { AccountModel } from "@/domain/model";
import { AddAccount, AddAccountParams } from "@/domain/usecases/add-account";

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
      case HttpPostCode.ok: return httpResponse.body
      case HttpPostCode.forbidden: throw new EmailInUseError()

      default: throw new UnexpectedError()
  }
  };
}