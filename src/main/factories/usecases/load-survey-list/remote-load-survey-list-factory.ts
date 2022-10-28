import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list"
import { makeApiUrl } from "@/main/factories/http/api-url-factory"
import { makeAuthorizeHttpGetClientDecorator } from "@/main/factories/decorators/authorize-http-get-client-decorator-factory"

export const makeRemoteSurveyList = () => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}