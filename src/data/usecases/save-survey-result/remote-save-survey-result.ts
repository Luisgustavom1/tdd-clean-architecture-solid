import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient } from '@/data/protocols/http'
import { SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: params
    })

    return null
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
