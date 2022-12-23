import { HttpClient } from '@/data/protocols/http'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { AuthorizeHttpClientDecorator } from '.'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  httpClientSpy: HttpClientSpy
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut,
    httpClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('Should not add header if storage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpClient.Request = {
      url: faker.internet.url(),
      method: 'POST',
      headers: {
        field: faker.random.words()
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toBe(httpRequest.headers)
  })

  it('Should add headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpClient.Request = {
      url: faker.internet.url(),
      method: 'POST'
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('Should merge headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpClient.Request = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      },
      method: 'POST'
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      ...httpRequest.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('Should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
