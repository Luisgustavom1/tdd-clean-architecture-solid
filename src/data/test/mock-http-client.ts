import { HttpPostClient, HttpPostParams } from "@/data/protocols/http/http-post-client";
import { HttpPostCode, HttpResponse } from "../protocols/http/http-response";

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
    url?: string;
    body?: T;
    response: HttpResponse<R> = {
        statusCode: HttpPostCode.ok
    }
    async post({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
        this.url = url
        this.body = body

        return Promise.resolve(this.response)
    }
}