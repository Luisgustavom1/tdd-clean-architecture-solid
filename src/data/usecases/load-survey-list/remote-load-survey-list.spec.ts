import { faker } from '@faker-js/faker'
import { HttpClientSpy } from '@/data/test/mock-http'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSurveyListModel } from '@/data/test'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpClient with correct METHOD', async () => {
    const { httpClientSpy, sut } = makeSut()
    sut.loadAll()
    expect(httpClientSpy.method).toBe('GET')
  })

  it('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
  })

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a list of a SurveyModels if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockSurveyListModel()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([{
      id: httpResult[0].id,
      question: httpResult[0].question,
      answers: httpResult[0].answers,
      didAnswer: httpResult[0].didAnswer,
      date: new Date(httpResult[0].date)
    }, {
      id: httpResult[1].id,
      question: httpResult[1].question,
      answers: httpResult[1].answers,
      didAnswer: httpResult[1].didAnswer,
      date: new Date(httpResult[1].date)
    }])
  })

  it('Should return a list of a SurveyModels if HttpClient returns 204', async () => {
    const { httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpClient.StatusCode.noContent
    }
    expect(httpClientSpy.response.body).toBeFalsy()
  })
})
