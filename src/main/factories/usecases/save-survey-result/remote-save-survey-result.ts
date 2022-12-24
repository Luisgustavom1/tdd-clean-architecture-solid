import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteSaveSurveyResult = (id: string) => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
