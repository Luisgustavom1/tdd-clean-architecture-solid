import { HttpClient } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { faker } from '@faker-js/faker'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

const makeSut = (url: string) => {
  const httpClientSpy = new HttpClientSpy()
  const saveSurveyResultSpy = new RemoteSaveSurveyResult(url, httpClientSpy)

  return {
    sut: saveSurveyResultSpy,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct URL and Method', () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    sut.save({ answer: '' })
    expect(httpClientSpy.method).toBe<HttpClient.Method>('PUT')
    expect(httpClientSpy.url).toBe(url)
  })
})
