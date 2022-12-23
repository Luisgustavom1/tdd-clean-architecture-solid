import { faker } from '@faker-js/faker'

import { RemoteAddAccount } from './remote-add-account'
import { HttpClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { HttpClient } from '@/data/protocols/http'
import { mockAddAccount, mockAddAccountModel } from '@/domain/test/mock-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpClient: HttpClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClient)

  return {
    sut,
    httpClient
  }
}

describe('Remote Add Account', () => {
  test('Should call HttClient with correct METHOD', async () => {
    const { sut, httpClient } = makeSut()

    await sut.add(mockAddAccount())

    expect(httpClient.method).toBe('POST')
  })

  test('Should call HttClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClient } = makeSut(url)

    await sut.add(mockAddAccount())

    expect(httpClient.url).toBe(url)
  })

  test('Should call HttClient with correct body', async () => {
    const url = faker.internet.url()
    const addAccountParams = mockAddAccount()
    const { sut, httpClient } = makeSut(url)

    await sut.add(addAccountParams)

    expect(httpClient.body).toEqual(addAccountParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.unauthorized
    }

    const promiseResult = sut.add(mockAddAccount())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.badRequest
    }

    const promiseResult = sut.add(mockAddAccount())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.serverError
    }

    const promiseResult = sut.add(mockAddAccount())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.notFound
    }

    const promiseResult = sut.add(mockAddAccount())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should an AddAccount.Model if HttpPostClient returns 200', async () => {
    const { sut, httpClient } = makeSut()
    const httpResult = mockAddAccountModel()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddAccount())

    expect(account).toEqual(httpResult)
  })
})
