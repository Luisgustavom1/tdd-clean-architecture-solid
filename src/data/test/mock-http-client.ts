import { HttpPostClient, HttpPostParams, HttpStatusCode, HttpResponse } from '@/data/protocols/http'

export class HttpPostClientSpy<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
    url?: string;
    body?: BodyType;
    response: HttpResponse<ResponseType> = {
      statusCode: HttpStatusCode.ok
    }

    async post ({ url, body }: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
      this.url = url
      this.body = body

      return Promise.resolve(this.response)
    }
}
