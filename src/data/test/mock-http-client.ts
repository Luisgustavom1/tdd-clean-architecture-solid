import { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import { HttpPostCode, HttpResponse } from "../protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
    url?: string;
    body?: object;
    response: HttpResponse = {
        statusCode: HttpPostCode.noContent
    }
    async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
        this.url = url
        this.body = body

        return Promise.resolve(this.response)
    }
}