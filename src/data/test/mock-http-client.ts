import { HttpPostClient, HttpPostParams } from "../protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
    url?: string;
    async post({ url }: HttpPostParams) {
        this.url = url

        return Promise.resolve()
    }
}