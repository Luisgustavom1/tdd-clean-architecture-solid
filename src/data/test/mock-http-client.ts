import { HttpPostClient, HttpPostParams } from "../protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
    url?: string;
    body?: object;

    async post({ url, body }: HttpPostParams) {
        this.url = url
        this.body = body

        return Promise.resolve()
    }
}