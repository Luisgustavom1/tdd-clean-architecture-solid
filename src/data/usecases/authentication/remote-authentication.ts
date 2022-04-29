import { HttpPostClient } from "@/data/protocols/http/http-post-client"

class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) { }

    async auth(): Promise<void> {
        return await this.httpPostClient.post(this.url)
    }
}

export default RemoteAuthentication