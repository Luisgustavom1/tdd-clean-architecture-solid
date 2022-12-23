import axios from 'axios'
import { mockHttpRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios.request with correct URL, BODY and verb', async () => {
    const request = mockHttpRequest()
    const { mockedAxios, sut } = makeSut()
    await sut.request(request)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      method: request.method,
      headers: request.headers
    })
  })

  test('Should return correct response on axios.request', async () => {
    const { mockedAxios, sut } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error on axios.request', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const httpResponsePromise = sut.request(mockHttpRequest())
    expect(httpResponsePromise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
