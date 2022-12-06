import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import { faker } from '@faker-js/faker'

const makeSut = (url: string = faker.internet.url()) => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpGetClien with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
