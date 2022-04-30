import { HttpPostClient, HttpPostParams, HttpPostCode, HttpResponse } from "@/data/protocols/http";

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