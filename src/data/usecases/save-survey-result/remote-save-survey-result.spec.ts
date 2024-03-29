import { HttpClient } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSaveSurveyResultParams } from '@/domain/test'
import { SaveSurveyResult } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

const makeSut = (url: string = faker.internet.url()) => {
  const httpClientSpy = new HttpClientSpy()
  const saveSurveyResultSpy = new RemoteSaveSurveyResult(url, httpClientSpy)

  return {
    sut: saveSurveyResultSpy,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct values', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    sut.save(saveSurveyResultParams)
    expect(httpClientSpy.method).toBe<HttpClient.Method>('PUT')
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  })

  it('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.forbidden
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.notFound
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throe UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.serverError
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a SurveyResult on 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyResultModel()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.ok,
      body: httpResult
    }
    const httpResponse = await sut.save(mockSaveSurveyResultParams())
    expect(httpResponse).toEqual<SaveSurveyResult.Model>({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
