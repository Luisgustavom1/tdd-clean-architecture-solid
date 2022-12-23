import { HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.request({
      url: this.url,
      method: 'GET'
    })
    const remoteSurveys = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpClient.StatusCode.ok: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
        date: new Date(remoteSurvey.date)
      }))
      case HttpClient.StatusCode.noContent: return []
      case HttpClient.StatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    answers: LoadSurveyList.AnswerModel[]
    date: string
    didAnswer: boolean
  }
}
