import { HttpClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request <R>(data: HttpClient.Request): Promise<HttpClient.Response<R>> {
    let axiosResponse: AxiosResponse<R>
    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        method: data.method,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
