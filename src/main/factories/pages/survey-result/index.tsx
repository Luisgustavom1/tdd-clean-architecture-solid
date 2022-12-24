import React from 'react'
import { SurveyResult } from '@/presentation/pages/survey-result/survey-result'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases/load-survey-result/remote-load-survey-result'
import { useParams } from 'react-router-dom'
import { makeRemoteSaveSurveyResult } from '@/main/factories/usecases/save-survey-result/remote-save-survey-result'

export const makeSurveyResult = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
