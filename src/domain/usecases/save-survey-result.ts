import { SurveyResultModel } from '../model'
import { LoadSurveyResult } from './load-survey-result'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<LoadSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  }

  export type Model = SurveyResultModel
}
