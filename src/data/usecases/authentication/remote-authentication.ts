import { HttpPostClient } from "@/data/protocols/http/http-post-client"
import { HttpPostCode, HttpResponse } from "@/data/protocols/http/http-response"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { AuthenticationParams } from "@/domain/usecases/authentication"

class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) { }

    async auth(params: AuthenticationParams): Promise<HttpResponse> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpPostCode.unathorized: throw new InvalidCredentialsError()

            default: return httpResponse
        }
    }
}

export default RemoteAuthentication