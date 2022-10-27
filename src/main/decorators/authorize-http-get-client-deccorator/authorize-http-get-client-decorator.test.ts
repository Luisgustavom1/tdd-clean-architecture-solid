import { HttpGetParams } from "@/data/protocols/http"
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/test"
import { mockAccountModel } from "@/domain/test"
import { faker } from "@faker-js/faker"
import { AuthorizeHttpGetClientDecorator } from "."

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('Should not add header if storage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    } 
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toBe(httpRequest.headers)
  })

  it('Should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    } 
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('Should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    } 
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...httpRequest.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })
})