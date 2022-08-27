import { HttpPostCode, HttpPostClient } from "@/data/protocols/http"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { UnexpectedError } from "@/domain/errors/unexpected-error"
import { AccountModel } from "@/domain/model"
import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication"

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) { }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpPostCode.ok: return httpResponse.body
            case HttpPostCode.unathorized: throw new InvalidCredentialsError()

            default: throw new UnexpectedError()
        }
    }
}