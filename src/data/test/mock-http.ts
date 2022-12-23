import { HttpClient } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockHttpRequest = (): HttpClient.Request => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
  body: faker.datatype.json(),
  headers: faker.datatype.json()
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  headers?: any
  method?: HttpClient.Method
  body?: any
  response: HttpClient.Response<R> = {
    statusCode: HttpClient.StatusCode.ok
  }

  async request (data: HttpClient.Request) {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers

    return this.response
  }
}
