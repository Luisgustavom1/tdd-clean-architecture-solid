import { faker } from '@faker-js/faker'
import { HttpClient } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'

const makeSut = (url: string = faker.internet.url()) => {
  const httpClient = new HttpClientSpy<RemoteLoadSurveyResult.Model>()
  const sut = new RemoteLoadSurveyResult(url, httpClient)

  return {
    sut,
    httpClient
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpClient with correct METHOD', async () => {
    const { httpClient, sut } = makeSut()
    sut.load()
    expect(httpClient.method).toBe('GET')
  })

  it('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClient } = makeSut(url)
    await sut.load()
    expect(httpClient.url).toBe(url)
  })

  it('Should throe AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throe UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throe UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a SurveyResult on 200', async () => {
    const { sut, httpClient } = makeSut()
    const httpResult = mockRemoteSurveyResultModel()
    httpClient.response = {
      statusCode: HttpClient.StatusCode.ok,
      body: httpResult
    }
    const httpResponse = await sut.load()
    expect(httpResponse).toEqual<LoadSurveyResult.Model>({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
