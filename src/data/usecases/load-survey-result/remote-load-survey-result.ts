import { HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.request({ url: this.url, method: 'GET' })
    const surveyResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpClient.StatusCode.ok:
        return Object.assign({}, surveyResult, { date: new Date(surveyResult?.date) })
      case HttpClient.StatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  }
}
