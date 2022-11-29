import React from 'react'
import SurveyList from '@/presentation/pages/load-survey-list/survey-list'
import { makeRemoteSurveyList } from '@/main/factories/usecases/load-survey-list/remote-load-survey-list-factory'

export const makeSurveyList = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyList()} />
}
