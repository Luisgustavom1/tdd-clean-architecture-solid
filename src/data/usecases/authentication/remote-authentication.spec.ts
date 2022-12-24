import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test'
import { mockAuthenticationModel, mockAuthentication } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpClient } from '@/data/protocols/http'
import { RemoteAddAccount } from '../add-account/remote-add-account'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAuthentication(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpClient with correct METHOD', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const body = mockAuthentication()
    await sut.auth(body)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toBe(body)
  })

  test('Should call HttpClient with correct body', async () => {
    const url = faker.internet.url()
    const authenticationParams = mockAuthentication()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.auth(authenticationParams)

    expect(httpClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.unauthorized
    }

    const promiseResult = sut.auth(mockAuthentication())

    await expect(promiseResult).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.badRequest
    }

    const promiseResult = sut.auth(mockAuthentication())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.serverError
    }

    const promiseResult = sut.auth(mockAuthentication())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.notFound
    }

    const promiseResult = sut.auth(mockAuthentication())

    await expect(promiseResult).rejects.toThrow(new UnexpectedError())
  })

  test('Should an AccoutModel if HttpPostClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAuthenticationModel()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthentication())

    expect(account).toEqual(httpResult)
  })
})
